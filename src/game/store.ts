import { create } from "zustand";
import {
  BOOST_BY_ID,
  GIFT_BOOST,
  GIFT_DESPAWN,
  GIFT_FIRST,
  GIFT_INTERVAL,
  GIFTS,
  STATIONS,
  STATION_BY_ID,
  UPGRADES,
} from "./catalog";
import {
  boostCost,
  canIpo,
  canUpgrade,
  clickPower,
  globalMult,
  nextStation,
  prestigeMult,
  stationRate,
  totalIncome,
  upgradeCost,
  type EconomySnap,
} from "./economy";
import { clearSave, defaultSave, hasProgress, loadSave, writeSave } from "./save";
import type { FloorGift, HireBeat, SaveV1 } from "./types";
import { sfx, setMuted as setAudioMuted } from "./audio";

export type FxKind = "cash" | "buy" | "boost" | "ipo" | "gift";

export type GameEvent = {
  id: number;
  kind: FxKind;
  x: number;
  y: number;
  text: string;
  at: number;
};

export type Panel = "none" | "shop" | "boosts" | "ipo" | "settings" | "crew";

type GameState = SaveV1 & {
  playing: boolean;
  combo: number;
  comboAt: number;
  awayCash: number;
  panel: Panel;
  events: GameEvent[];
  shake: number;
  hydrated: boolean;
  hasSave: boolean;
  lastHire: HireBeat | null;
  tick: (dt: number) => void;
  start: (fresh: boolean) => void;
  buyStation: (id: string) => boolean;
  upgradeStation: (id: string) => boolean;
  buyUpgrade: (id: string) => boolean;
  activateBoost: (id: string) => boolean;
  collect: (id: string) => number;
  collectAll: () => number;
  clickStation: (id: string) => number;
  collectGift: () => boolean;
  ipo: () => boolean;
  setPanel: (panel: Panel) => void;
  toggleMuted: () => void;
  dismissAway: () => void;
  wipe: () => void;
  persist: () => void;
};

let eventSeq = 1;
let saveAcc = 0;
let giftSeq = 0;

function snapOf(s: SaveV1 & { combo: number }): EconomySnap {
  return {
    cash: s.cash,
    lifetime: s.lifetime,
    prestige: s.prestige,
    owned: s.owned,
    wifi: s.wifi,
    clickLvl: s.clickLvl,
    hr: s.hr,
    boostUntil: s.boostUntil,
    giftBoostUntil: s.giftBoostUntil,
    time: s.time,
    combo: s.combo,
  };
}

function toSave(s: SaveV1): SaveV1 {
  return {
    version: 2,
    cash: s.cash,
    lifetime: s.lifetime,
    prestige: s.prestige,
    owned: s.owned,
    pending: s.pending,
    wifi: s.wifi,
    clickLvl: s.clickLvl,
    auto: s.auto,
    offline: s.offline,
    hr: s.hr,
    boostUntil: s.boostUntil,
    boostCd: s.boostCd,
    time: s.time,
    lastWall: Date.now(),
    muted: s.muted,
    gift: s.gift,
    giftDue: s.giftDue,
    giftBoostUntil: s.giftBoostUntil,
    storyLog: s.storyLog,
  };
}

function pushEvent(list: GameEvent[], kind: FxKind, text: string): GameEvent[] {
  const next = list.filter((e) => e.at > performance.now() - 1400).slice(-18);
  next.push({ id: eventSeq++, kind, text, x: 0.5, y: 0.42, at: performance.now() });
  return next;
}

const GIFT_TILES: Array<[number, number]> = [
  [4, 2],
  [2, 2],
  [6, 2],
  [4, 4],
  [8, 3],
  [0, 4],
  [2, 4],
  [6, 4],
];

function spawnGift(time: number): FloorGift {
  const [col, row] = GIFT_TILES[giftSeq % GIFT_TILES.length]!;
  const flavor = giftSeq % GIFTS.length;
  giftSeq += 1;
  return { col, row, flavor, until: time + GIFT_DESPAWN };
}

export const useGame = create<GameState>()((set, get) => ({
  ...defaultSave(),
  playing: false,
  combo: 0,
  comboAt: 0,
  awayCash: 0,
  panel: "none",
  events: [],
  shake: 0,
  hydrated: false,
  hasSave: false,
  lastHire: null,

  tick: (dt) => {
    const s = get();
    if (!s.playing) return;
    const time = s.time + dt;
    const pending = { ...s.pending };
    const economy = snapOf({ ...s, time });
    let cash = s.cash;
    let lifetime = s.lifetime;
    const shake = Math.max(0, s.shake - dt * 2.4);
    let gift = s.gift;
    let giftDue = s.giftDue;

    if (gift && time > gift.until) gift = null;
    if (!gift && time >= giftDue) {
      gift = spawnGift(time);
      giftDue = time + GIFT_INTERVAL;
    }

    if (s.auto) {
      const add = totalIncome(economy) * dt;
      cash += add;
      lifetime += add;
      for (const st of STATIONS) pending[st.id] = 0;
    } else {
      const gm = globalMult(economy);
      for (const st of STATIONS) {
        const lvl = s.owned[st.id] ?? 0;
        if (lvl <= 0) continue;
        const r = stationRate(st, lvl, gm);
        pending[st.id] = Math.min((pending[st.id] ?? 0) + r * dt, r * 90);
      }
    }

    saveAcc += dt;
    if (saveAcc > 5) {
      saveAcc = 0;
      writeSave(toSave({ ...s, cash, lifetime, pending, time, gift, giftDue }));
    }

    set({ cash, lifetime, pending, time, shake, gift, giftDue });
  },

  start: (fresh) => {
    if (fresh) {
      const d = defaultSave();
      set({
        ...d,
        playing: true,
        hydrated: true,
        hasSave: false,
        awayCash: 0,
        panel: "none",
        combo: 0,
        lastHire: {
          name: d.storyLog[0] ? STATION_BY_ID.cardboard.character.name : "Rae Voss",
          role: "Founder",
          quote: STATION_BY_ID.cardboard.character.quote,
          portrait: 0,
          at: performance.now(),
        },
      });
      writeSave(d);
      setAudioMuted(d.muted);
      return;
    }
    const loaded = loadSave();
    const now = Date.now();
    const elapsed = Math.max(0, Math.min((now - loaded.lastWall) / 1000, 8 * 3600));
    let away = 0;
    if (elapsed > 50) {
      const ips = totalIncome(snapOf({ ...loaded, combo: 0 }));
      const rate = loaded.offline ? 0.5 : 0.12;
      away = ips * elapsed * rate;
    }
    set({
      ...loaded,
      cash: loaded.cash + away,
      lifetime: loaded.lifetime + away,
      playing: true,
      hydrated: true,
      hasSave: hasProgress(loaded),
      awayCash: away,
      lastWall: now,
      combo: 0,
      lastHire: null,
    });
    setAudioMuted(loaded.muted);
  },

  buyStation: (id) => {
    const s = get();
    const def = STATION_BY_ID[id];
    if (!def) return false;
    if ((s.owned[id] ?? 0) > 0) return false;
    const nxt = nextStation(s.owned);
    if (!nxt || nxt.id !== id) return false;
    if (s.cash < def.cost) {
      sfx.deny();
      return false;
    }
    const beat = `${def.character.name} joins as ${def.character.role}.`;
    set({
      cash: s.cash - def.cost,
      owned: { ...s.owned, [id]: 1 },
      events: pushEvent(s.events, "buy", def.character.name),
      shake: Math.min(1, s.shake + 0.35),
      storyLog: [...s.storyLog, beat].slice(-8),
      lastHire: {
        name: def.character.name,
        role: def.character.role,
        quote: def.character.quote,
        portrait: def.character.portrait,
        at: performance.now(),
      },
    });
    sfx.buy();
    get().persist();
    return true;
  },

  upgradeStation: (id) => {
    const s = get();
    const def = STATION_BY_ID[id];
    const level = s.owned[id] ?? 0;
    if (!def || !canUpgrade(level)) return false;
    const cost = upgradeCost(def, level);
    if (s.cash < cost) {
      sfx.deny();
      return false;
    }
    set({
      cash: s.cash - cost,
      owned: { ...s.owned, [id]: level + 1 },
      events: pushEvent(s.events, "buy", `Lv ${level + 1}`),
    });
    sfx.upgrade();
    get().persist();
    return true;
  },

  buyUpgrade: (id) => {
    const s = get();
    const def = UPGRADES.find((u) => u.id === id);
    if (!def) return false;
    const level =
      id === "wifi"
        ? s.wifi
        : id === "click"
          ? s.clickLvl
          : id === "hr"
            ? s.hr
            : id === "auto"
              ? s.auto
                ? 1
                : 0
              : s.offline
                ? 1
                : 0;
    if (level >= def.max) return false;
    const cost = def.cost(level);
    if (s.cash < cost) {
      sfx.deny();
      return false;
    }
    const patch: Partial<GameState> = { cash: s.cash - cost };
    if (id === "wifi") patch.wifi = s.wifi + 1;
    if (id === "click") patch.clickLvl = s.clickLvl + 1;
    if (id === "hr") patch.hr = s.hr + 1;
    if (id === "auto") patch.auto = true;
    if (id === "offline") patch.offline = true;
    set(patch);
    sfx.upgrade();
    get().persist();
    return true;
  },

  activateBoost: (id) => {
    const s = get();
    const def = BOOST_BY_ID[id];
    if (!def) return false;
    if ((s.boostCd[id] ?? 0) > s.time) {
      sfx.deny();
      return false;
    }
    const cost = boostCost(def, totalIncome(snapOf(s)));
    if (s.cash < cost) {
      sfx.deny();
      return false;
    }
    let cash = s.cash - cost;
    let lifetime = s.lifetime;
    const boostUntil = { ...s.boostUntil };
    const boostCd = { ...s.boostCd, [id]: s.time + def.cooldown };
    if (def.kind === "instant") {
      const gain = totalIncome(snapOf(s)) * def.instantSeconds;
      cash += gain;
      lifetime += gain;
    } else {
      boostUntil[id] = s.time + def.duration;
    }
    set({
      cash,
      lifetime,
      boostUntil,
      boostCd,
      events: pushEvent(s.events, "boost", def.name),
      shake: Math.min(1, s.shake + 0.25),
    });
    sfx.boost();
    get().persist();
    return true;
  },

  collect: (id) => {
    const s = get();
    const amt = s.pending[id] ?? 0;
    if (amt <= 0.5) return 0;
    set({
      cash: s.cash + amt,
      lifetime: s.lifetime + amt,
      pending: { ...s.pending, [id]: 0 },
    });
    sfx.collect();
    return amt;
  },

  collectAll: () => {
    const s = get();
    let sum = 0;
    const pending = { ...s.pending };
    for (const k of Object.keys(pending)) {
      sum += pending[k] ?? 0;
      pending[k] = 0;
    }
    if (sum <= 0.5) return 0;
    set({ cash: s.cash + sum, lifetime: s.lifetime + sum, pending });
    sfx.collect();
    return sum;
  },

  clickStation: (id) => {
    const s = get();
    const def = STATION_BY_ID[id];
    if (!def) return 0;
    if ((s.owned[id] ?? 0) <= 0) {
      get().buyStation(id);
      return 0;
    }
    const now = s.time;
    const combo = now - s.comboAt < 0.75 ? s.combo + 1 : 1;
    const pendingAmt = s.pending[id] ?? 0;
    const power = clickPower(snapOf({ ...s, combo }));
    const gain = pendingAmt + power;
    set({
      cash: s.cash + gain,
      lifetime: s.lifetime + gain,
      pending: { ...s.pending, [id]: 0 },
      combo,
      comboAt: now,
      events: pushEvent(s.events, "cash", `+${gain < 10 ? gain.toFixed(1) : Math.floor(gain)}`),
    });
    sfx.click();
    return gain;
  },

  collectGift: () => {
    const s = get();
    if (!s.gift) return false;
    const flavor = GIFTS[s.gift.flavor] ?? GIFTS[0]!;
    set({
      gift: null,
      giftBoostUntil: s.time + GIFT_BOOST,
      events: pushEvent(s.events, "gift", flavor.name),
      shake: Math.min(1, s.shake + 0.45),
      storyLog: [...s.storyLog, `${flavor.name} — ${flavor.from}.`].slice(-8),
    });
    sfx.gift();
    get().persist();
    return true;
  },

  ipo: () => {
    const s = get();
    if (!canIpo(snapOf(s))) {
      sfx.deny();
      return false;
    }
    const prestige = s.prestige + 1;
    const owned: Record<string, number> = {};
    const pending: Record<string, number> = {};
    for (const st of STATIONS) {
      owned[st.id] = st.id === "cardboard" ? 1 : 0;
      pending[st.id] = 0;
    }
    const cash = 40 * 8 ** Math.min(prestige, 5);
    set({
      prestige,
      owned,
      pending,
      cash,
      wifi: 0,
      clickLvl: 0,
      auto: false,
      hr: 0,
      boostUntil: {},
      boostCd: {},
      combo: 0,
      panel: "none",
      gift: null,
      giftDue: GIFT_FIRST,
      giftBoostUntil: 0,
      events: pushEvent(s.events, "ipo", `IPO ×${prestigeMult(prestige)}`),
      shake: 1,
      storyLog: [
        `Series ${"ABCDEFGH"[Math.min(prestige, 7)]} filed. Halcyon is a rumor now.`,
      ],
      lastHire: {
        name: "Rae Voss",
        role: "CEO, again",
        quote: "Same cardboard. Different gravity.",
        portrait: 0,
        at: performance.now(),
      },
    });
    sfx.ipo();
    get().persist();
    return true;
  },

  setPanel: (panel) => set({ panel: get().panel === panel ? "none" : panel }),
  toggleMuted: () => {
    const muted = !get().muted;
    set({ muted });
    setAudioMuted(muted);
    get().persist();
  },
  dismissAway: () => set({ awayCash: 0 }),
  wipe: () => {
    clearSave();
    const d = defaultSave();
    set({
      ...d,
      playing: false,
      hasSave: false,
      awayCash: 0,
      panel: "none",
      combo: 0,
      events: [],
      lastHire: null,
    });
  },
  persist: () => {
    writeSave(toSave(get()));
  },
}));

export function hydrateMenu() {
  const loaded = loadSave();
  useGame.setState({
    ...loaded,
    hydrated: true,
    hasSave: hasProgress(loaded),
    playing: false,
  });
}
