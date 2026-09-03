import { useEffect, useRef } from "react";
import { GRID_H, GRID_W, GIFTS, STATIONS } from "./catalog";
import { globalMult, nextStation, stationRate } from "./economy";
import { diamond, inDiamond, iso, screenToIso, TILE_H, TILE_W } from "./iso";
import { emptyBank, loadSprites, type SpriteBank } from "./assets";
import { formatMoney } from "./format";
import { useGame } from "./store";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  kind: "spark" | "steam" | "coin";
};

type Float = { x: number; y: number; text: string; life: number };

export function OfficeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let bank: SpriteBank = emptyBank;
    void loadSprites().then((b) => {
      bank = b;
    });

    const particles: Particle[] = [];
    const floats: Float[] = [];
    const pops = new Map<string, number>();
    let lastOwned = "";
    let panX = 0;
    let panY = 0;
    let dragging = false;
    let dragMoved = false;
    let lastPtr = { x: 0, y: 0 };
    let startPtr = { x: 0, y: 0 };
    let last = performance.now();
    let acc = 0;
    let raf = 0;
    let cam = { ox: 0, oy: 0, scale: 1 };
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = wrap!.clientWidth;
      const h = wrap!.clientHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
    }

    function worldTransform() {
      const w = canvas!.width;
      const h = canvas!.height;
      const worldW = (GRID_W + GRID_H) * (TILE_W / 2) + 80;
      const worldH = (GRID_W + GRID_H) * (TILE_H / 2) + 180;
      const scale = Math.min(w / worldW, h / worldH) * 1.08;
      const origin = iso((GRID_W - 1) / 2, (GRID_H - 1) / 2);
      return {
        scale,
        ox: w / 2 - origin.x * scale + panX,
        oy: h * 0.4 - origin.y * scale + panY,
      };
    }

    function toWorld(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = canvas!.width / rect.width;
      const sx = (clientX - rect.left) * dpr;
      const sy = (clientY - rect.top) * dpr;
      const { ox, oy, scale } = cam;
      return { x: (sx - ox) / scale, y: (sy - oy) / scale, sx, sy };
    }

    function spawnSparks(x: number, y: number, n: number, kind: Particle["kind"] = "spark") {
      if (reduced) return;
      for (let i = 0; i < n; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 70,
          vy: -20 - Math.random() * 50,
          life: 0.4 + Math.random() * 0.5,
          max: 0.9,
          kind,
        });
      }
    }

    function hitStation(wx: number, wy: number) {
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const s = STATIONS[i]!;
        const p = iso(s.col, s.row);
        if (inDiamond(wx, wy, p.x, p.y - 8, TILE_W * 1.15, TILE_H * 1.6)) return s;
      }
      const g = screenToIso(wx, wy);
      const col = Math.round(g.col);
      const row = Math.round(g.row);
      return STATIONS.find((s) => s.col === col && s.row === row);
    }

    function onDown(ev: PointerEvent) {
      dragging = true;
      dragMoved = false;
      lastPtr = { x: ev.clientX, y: ev.clientY };
      startPtr = { x: ev.clientX, y: ev.clientY };
      canvas!.setPointerCapture(ev.pointerId);
    }

    function onMove(ev: PointerEvent) {
      if (!dragging) return;
      const dx = ev.clientX - lastPtr.x;
      const dy = ev.clientY - lastPtr.y;
      if (Math.hypot(ev.clientX - startPtr.x, ev.clientY - startPtr.y) > 10) dragMoved = true;
      lastPtr = { x: ev.clientX, y: ev.clientY };
      if (dragMoved) {
        const dpr = canvas!.width / canvas!.getBoundingClientRect().width;
        panX += dx * dpr;
        panY += dy * dpr;
      }
    }

    function onUp(ev: PointerEvent) {
      dragging = false;
      if (dragMoved) return;
      const w = toWorld(ev.clientX, ev.clientY);
      const game = useGame.getState();
      if (game.gift) {
        const gp = iso(game.gift.col, game.gift.row);
        if (inDiamond(w.x, w.y, gp.x, gp.y - 10, TILE_W * 1.3, TILE_H * 1.8)) {
          if (game.collectGift()) {
            floats.push({ x: gp.x, y: gp.y - 40, text: "3× 60s", life: 1.2 });
            spawnSparks(gp.x, gp.y - 8, 18, "spark");
            spawnSparks(gp.x, gp.y - 8, 10, "coin");
          }
          return;
        }
      }
      const st = hitStation(w.x, w.y);
      if (st) {
        const before = Object.values(game.owned).join(",");
        const gain = game.clickStation(st.id);
        const p = iso(st.col, st.row);
        if (gain > 0) {
          floats.push({ x: p.x, y: p.y - 36, text: `+${formatMoney(gain)}`, life: 0.9 });
          spawnSparks(p.x, p.y - 10, 7, "coin");
        } else if (
          useGame.getState().owned[st.id] !== game.owned[st.id] ||
          before !== Object.values(useGame.getState().owned).join(",")
        ) {
          pops.set(st.id, 1);
          spawnSparks(p.x, p.y, 14);
        }
        return;
      }
      const all = game.collectAll();
      if (all > 0) floats.push({ x: w.x, y: w.y, text: `+${formatMoney(all)}`, life: 0.9 });
    }

    function drawHelipad(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
      ctx.save();
      diamond(ctx, x, y, TILE_W * 1.6, TILE_H * 1.6);
      ctx.fillStyle = "#2a2d34";
      ctx.fill();
      ctx.strokeStyle = "rgba(201,137,98,0.55)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y, 22, 11, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(110,174,164,${0.55 + Math.sin(t * 3) * 0.2})`;
      ctx.stroke();
      ctx.font = "700 14px Outfit, sans-serif";
      ctx.fillStyle = "#f2efe6";
      ctx.textAlign = "center";
      ctx.fillText("H", x, y + 5);
      ctx.restore();
    }

    function drawSprite(
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement | null,
      x: number,
      y: number,
      height: number,
    ) {
      if (!img || !img.complete || img.naturalWidth === 0) return false;
      const w = img.width * (height / img.height);
      ctx.drawImage(img, x - w / 2, y - height, w, height);
      return true;
    }

    function frame(now: number) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      acc += dt;
      const step = 1 / 20;
      while (acc >= step) {
        useGame.getState().tick(step);
        acc -= step;
      }

      const state = useGame.getState();
      const ownedKey = Object.entries(state.owned)
        .filter(([, v]) => v > 0)
        .map(([k]) => k)
        .join(",");
      if (ownedKey !== lastOwned) {
        lastOwned = ownedKey;
      }

      cam = worldTransform();
      const ctx = canvas!.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const w = canvas!.width;
      const h = canvas!.height;
      ctx.clearRect(0, 0, w, h);

      // sky / city
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#14202a");
      sky.addColorStop(0.45, "#101820");
      sky.addColorStop(1, "#0b1014");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      if (bank.city) {
        ctx.save();
        ctx.globalAlpha = 0.62;
        const iw = w;
        const ih = iw * (bank.city.height / bank.city.width);
        ctx.drawImage(bank.city, 0, 0, iw, ih);
        ctx.restore();
        const fade = ctx.createLinearGradient(0, ih * 0.35, 0, ih);
        fade.addColorStop(0, "rgba(11,16,20,0)");
        fade.addColorStop(1, "#0b1014");
        ctx.fillStyle = fade;
        ctx.fillRect(0, 0, w, h);
      }

      const trauma = reduced ? 0 : state.shake * state.shake;
      const shakeX = trauma ? (Math.random() - 0.5) * 14 * trauma : 0;
      const shakeY = trauma ? (Math.random() - 0.5) * 10 * trauma : 0;

      ctx.save();
      ctx.translate(cam.ox + shakeX, cam.oy + shakeY);
      ctx.scale(cam.scale, cam.scale);

      // window wall
      for (let c = -1; c < GRID_W + 1; c++) {
        const p = iso(c, -0.7);
        ctx.fillStyle = "rgba(18,28,34,0.9)";
        ctx.beginPath();
        ctx.moveTo(p.x - TILE_W / 2, p.y);
        ctx.lineTo(p.x, p.y - 90);
        ctx.lineTo(p.x + TILE_W / 2, p.y);
        ctx.lineTo(p.x, p.y + TILE_H / 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(110,174,164,0.22)";
        ctx.stroke();
      }

      // floor
      for (let row = 0; row < GRID_H; row++) {
        for (let col = 0; col < GRID_W; col++) {
          const p = iso(col, row);
          diamond(ctx, p.x, p.y);
          const even = (col + row) % 2 === 0;
          ctx.fillStyle = even ? "#1a262c" : "#141c22";
          ctx.fill();
          ctx.strokeStyle = "rgba(201,137,98,0.12)";
          ctx.lineWidth = 1.25;
          ctx.stroke();
        }
      }

      // wood lip
      for (let col = 0; col < GRID_W; col++) {
        const p = iso(col, GRID_H - 0.5);
        diamond(ctx, p.x, p.y + 10, TILE_W, 18);
        ctx.fillStyle = "#3a2c22";
        ctx.fill();
      }

      const nxt = nextStation(state.owned);
      const t = state.time;
      const gm = globalMult(state);
      const frameI = Math.floor(t * 4) % 4;

      type DrawItem = { depth: number; draw: () => void };
      const items: DrawItem[] = [];

      // plants in corners once a few desks exist
      const ownedN = STATIONS.filter((s) => (state.owned[s.id] ?? 0) > 0).length;
      if (ownedN >= 3) {
        const spots = [
          { c: 0, r: 0 },
          { c: GRID_W - 1, r: 0 },
          { c: 0, r: GRID_H - 1 },
        ];
        for (const sp of spots) {
          const p = iso(sp.c, sp.r);
          items.push({
            depth: sp.c + sp.r,
            draw: () => {
              ctx.save();
              ctx.fillStyle = "rgba(0,0,0,0.28)";
              ctx.beginPath();
              ctx.ellipse(p.x, p.y + 6, 16, 8, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
              drawSprite(ctx, bank.furn[8] ?? bank.plant, p.x, p.y + 10, 74);
            },
          });
        }
      }

      for (const st of STATIONS) {
        const p = iso(st.col, st.row);
        const lvl = state.owned[st.id] ?? 0;
        const pop = pops.get(st.id) ?? 0;
        if (pop > 0) pops.set(st.id, Math.max(0, pop - dt * 2.6));
        const popScale = 1 + (reduced ? 0 : Math.sin(Math.min(1, pop) * Math.PI) * 0.12);

        items.push({
          depth: st.col + st.row,
          draw: () => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.scale(popScale, popScale);
            ctx.translate(-p.x, -p.y);

            if (lvl <= 0) {
              const isNext = nxt?.id === st.id;
              const can = isNext && state.cash >= st.cost;
              const pulse = isNext ? 0.55 + Math.sin(t * 4) * 0.25 : 0.18;
              diamond(ctx, p.x, p.y, TILE_W * 0.92, TILE_H * 0.92);
              ctx.fillStyle = can
                ? `rgba(110,174,164,${0.3 + pulse * 0.38})`
                : isNext
                  ? `rgba(201,137,98,${0.2 + pulse * 0.28})`
                  : "rgba(243,234,220,0.04)";
              ctx.fill();
              if (isNext) {
                ctx.strokeStyle = can ? "rgba(110,174,164,0.95)" : "rgba(201,137,98,0.85)";
                ctx.lineWidth = 2.4;
                ctx.stroke();
                ctx.font = "600 11px Outfit, sans-serif";
                ctx.textAlign = "center";
                ctx.fillStyle = "#f3eadc";
                ctx.fillText(st.name, p.x, p.y - 22);
                ctx.fillStyle = can ? "#6eaea4" : "#c98962";
                ctx.font = "600 12px IBM Plex Mono, monospace";
                ctx.fillText(st.cost === 0 ? "FREE" : formatMoney(st.cost), p.x, p.y + 4);
              }
            } else {
              ctx.fillStyle = "rgba(0,0,0,0.32)";
              ctx.beginPath();
              ctx.ellipse(p.x, p.y + 8, 28 * st.scale, 12, 0, 0, Math.PI * 2);
              ctx.fill();

              if (st.furn < 0) {
                drawHelipad(ctx, p.x, p.y, t);
              } else {
                const img = bank.furn[st.furn] ?? null;
                const ok = drawSprite(ctx, img, p.x, p.y + 12, 86 * st.scale);
                if (!ok) {
                  diamond(ctx, p.x, p.y, TILE_W * 0.8, TILE_H * 0.8);
                  ctx.fillStyle = "#3a332c";
                  ctx.fill();
                }
              }

              const pending = state.pending[st.id] ?? 0;
              if (pending > 1 && !state.auto) {
                const ci = Math.floor(t * 6) % 4;
                drawSprite(ctx, bank.cash[ci] ?? null, p.x + 26, p.y - 6, 28 + Math.min(18, Math.log10(pending + 1) * 8));
              }

              if (st.staff > 0) {
                const workers = st.staff >= 3 ? 2 : 1;
                for (let i = 0; i < workers; i++) {
                  const sheet = (st.col + i) % 2 === 0 ? bank.workerA : bank.workerB;
                  const ox = i === 0 ? -30 : 32;
                  drawSprite(ctx, sheet[frameI] ?? null, p.x + ox, p.y + 8, 52);
                }
              }

              if (st.id === "coffee" && !reduced) {
                spawnSparks(p.x + 8, p.y - 40, t % 0.4 < dt ? 1 : 0, "steam");
              }

              ctx.font = "600 10px Outfit, sans-serif";
              ctx.textAlign = "center";
              ctx.fillStyle = "rgba(201,137,98,0.85)";
              ctx.fillText(st.character.name, p.x, p.y + 22);
              ctx.fillStyle = "rgba(243,234,220,0.45)";
              ctx.fillText(`Lv ${lvl}`, p.x, p.y + 34);
            }

            ctx.restore();
          },
        });
      }

      if (state.gift) {
        const gp = iso(state.gift.col, state.gift.row);
        items.push({
          depth: state.gift.col + state.gift.row + 0.4,
          draw: () => {
            const bounce = reduced ? 0 : Math.sin(t * 5) * 6;
            const pulse = 0.45 + Math.sin(t * 6) * 0.25;
            ctx.save();
            const beam = ctx.createLinearGradient(gp.x, gp.y - 120, gp.x, gp.y);
            beam.addColorStop(0, "rgba(110,174,164,0)");
            beam.addColorStop(1, `rgba(110,174,164,${0.18 + pulse * 0.2})`);
            ctx.fillStyle = beam;
            ctx.beginPath();
            ctx.moveTo(gp.x - 16, gp.y);
            ctx.lineTo(gp.x - 4, gp.y - 120);
            ctx.lineTo(gp.x + 4, gp.y - 120);
            ctx.lineTo(gp.x + 16, gp.y);
            ctx.closePath();
            ctx.fill();
            diamond(ctx, gp.x, gp.y, TILE_W * 0.95, TILE_H * 0.95);
            ctx.strokeStyle = `rgba(201,137,98,${0.5 + pulse})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0.35)";
            ctx.beginPath();
            ctx.ellipse(gp.x, gp.y + 8, 18, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            const gi = Math.floor(t * 6) % 4;
            drawSprite(ctx, bank.gift[gi] ?? null, gp.x, gp.y + bounce, 46);
            ctx.font = "600 11px Outfit, sans-serif";
            ctx.textAlign = "center";
            ctx.fillStyle = "#f3eadc";
            const flavor = GIFTS[state.gift!.flavor] ?? GIFTS[0]!;
            ctx.fillText(flavor.name, gp.x, gp.y - 52 + bounce);
            ctx.restore();
          },
        });
      }

      items.sort((a, b) => a.depth - b.depth);
      for (const it of items) it.draw();

      // steam / particles in world
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += (p.kind === "steam" ? -20 : 80) * dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const a = p.life / p.max;
        ctx.globalAlpha = a;
        if (p.kind === "coin") {
          ctx.fillStyle = "#d5d0c4";
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, 4, 3, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.kind === "steam" ? "#cfd4da" : "#8fa3b8";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.kind === "steam" ? 3.5 : 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      for (let i = floats.length - 1; i >= 0; i--) {
        const f = floats[i]!;
        f.life -= dt;
        f.y -= 28 * dt;
        if (f.life <= 0) {
          floats.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.min(1, f.life * 2);
        ctx.font = "600 13px IBM Plex Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#f2efe6";
        ctx.fillText(f.text, f.x, f.y);
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // income sparkles when auto
      if (state.auto && !reduced && Math.random() < dt * 3) {
        const owned = STATIONS.filter((s) => (state.owned[s.id] ?? 0) > 0);
        const st = owned[Math.floor(Math.random() * owned.length)];
        if (st) {
          const p = iso(st.col, st.row);
          spawnSparks(p.x, p.y - 20, 2, "coin");
        }
      }

      void stationRate;
      void gm;

      raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full min-h-0 w-full overflow-hidden bg-bg">
      <canvas
        ref={canvasRef}
        className="block h-full w-full touch-none"
        aria-label="Hustle HQ office floor"
      />
    </div>
  );
}
