import type { ReactNode } from "react";
import {
  Briefcase,
  Coffee,
  Gauge,
  Gift,
  Landmark,
  MousePointer2,
  Rocket,
  Settings,
  Store,
  Users,
  Volume2,
  VolumeX,
  Wifi,
  Zap,
  X,
} from "lucide-react";
import {
  BOOSTS,
  GIFT_BOOST,
  GIFT_INTERVAL,
  GIFT_MULT,
  GIFTS,
  IPO_STATIONS_REQUIRED,
  STATIONS,
  UPGRADES,
} from "./catalog";
import {
  boostCost,
  canIpo,
  canUpgrade,
  clickPower,
  ipoRequirementLabel,
  nextStation,
  ownedCount,
  prestigeMult,
  staffCount,
  stationRate,
  totalIncome,
  upgradeCost,
} from "./economy";
import { formatMoney, formatRate, formatTime } from "./format";
import { cn } from "@/lib/cn";
import { useGame, type Panel } from "./store";
import type { BoostDef, StationDef, UpgradeDef } from "./types";

function snap(s: ReturnType<typeof useGame.getState>) {
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

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("frame flex items-center gap-2 rounded-xl bg-surface/95 px-3 py-2 text-sm", className)}>
      {children}
    </div>
  );
}

export function Hud() {
  const cash = useGame((s) => s.cash);
  const prestige = useGame((s) => s.prestige);
  const muted = useGame((s) => s.muted);
  const panel = useGame((s) => s.panel);
  const combo = useGame((s) => s.combo);
  const auto = useGame((s) => s.auto);
  const owned = useGame((s) => s.owned);
  const wifi = useGame((s) => s.wifi);
  const clickLvl = useGame((s) => s.clickLvl);
  const hr = useGame((s) => s.hr);
  const boostUntil = useGame((s) => s.boostUntil);
  const giftBoostUntil = useGame((s) => s.giftBoostUntil);
  const gift = useGame((s) => s.gift);
  const giftDue = useGame((s) => s.giftDue);
  const time = useGame((s) => s.time);
  const playing = useGame((s) => s.playing);
  const lastHire = useGame((s) => s.lastHire);

  const economy = {
    cash,
    lifetime: 0,
    prestige,
    owned,
    wifi,
    clickLvl,
    hr,
    boostUntil,
    giftBoostUntil,
    time,
    combo,
  };
  const ips = totalIncome(economy);
  const activeBoosts = BOOSTS.filter((b) => (boostUntil[b.id] ?? 0) > time);
  const giftLive = giftBoostUntil - time;
  const giftEta = Math.max(0, giftDue - time);
  const hireFresh = lastHire && performance.now() - lastHire.at < 5200;

  if (!playing) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5">
        <div className="pointer-events-auto flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-xl font-medium tracking-tight text-fg sm:text-2xl">Hustle HQ</p>
            <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent">
              Floor 42 · Against Halcyon
            </p>
            <Chip className="frame-strong mt-2 rounded-2xl px-4 py-3">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted">Cash</p>
                <p className="font-mono text-2xl font-medium tabular-nums text-fg sm:text-3xl">{formatMoney(cash)}</p>
                <p className="mt-0.5 text-xs tabular-nums text-teal">{formatRate(ips)}</p>
              </div>
            </Chip>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <IconBtn label={muted ? "Unmute" : "Mute"} onClick={() => useGame.getState().toggleMuted()}>
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </IconBtn>
              <IconBtn label="Settings" onClick={() => useGame.getState().setPanel("settings")}>
                <Settings className="size-4" />
              </IconBtn>
            </div>
            {prestige > 0 && (
              <Chip>
                <Landmark className="size-3.5 text-accent" />
                <span className="font-mono text-xs tabular-nums">×{prestigeMult(prestige)}</span>
              </Chip>
            )}
            {combo > 1 && (
              <Chip>
                <MousePointer2 className="size-3.5 text-teal" />
                <span className="font-mono text-xs tabular-nums">x{combo} combo</span>
              </Chip>
            )}
            {auto && (
              <Chip>
                <Users className="size-3.5 text-accent" />
                <span className="text-xs">Nico collecting</span>
              </Chip>
            )}
            <Chip className={gift ? "frame-strong" : undefined}>
              <Gift className="size-3.5 text-accent" />
              <span className="font-mono text-xs tabular-nums">
                {gift
                  ? "Gift on the floor"
                  : giftLive > 0
                    ? `${GIFT_MULT}× ${formatTime(giftLive)}`
                    : `Gift ${formatTime(giftEta)}`}
              </span>
            </Chip>
          </div>
        </div>

        {hireFresh && lastHire && <HireBanner />}

        <div className="pointer-events-auto space-y-3">
          {(activeBoosts.length > 0 || giftLive > 0) && (
            <div className="flex flex-wrap gap-2">
              {giftLive > 0 && (
                <span className="frame-strong inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-xs text-fg">
                  <Gift className="size-3 text-accent" />
                  Courier {GIFT_MULT}×
                  <span className="font-mono tabular-nums text-muted">{formatTime(giftLive)}</span>
                </span>
              )}
              {activeBoosts.map((b) => (
                <span
                  key={b.id}
                  className="frame inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-xs text-fg"
                >
                  <Zap className="size-3 text-teal" />
                  {b.name}
                  <span className="font-mono tabular-nums text-muted">
                    {formatTime((boostUntil[b.id] ?? 0) - time)}
                  </span>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <NavBtn
              active={panel === "shop"}
              onClick={() => useGame.getState().setPanel("shop")}
              icon={<Store className="size-4" />}
              label="Build"
            />
            <NavBtn
              active={panel === "crew"}
              onClick={() => useGame.getState().setPanel("crew")}
              icon={<Users className="size-4" />}
              label="Crew"
            />
            <NavBtn
              active={panel === "boosts"}
              onClick={() => useGame.getState().setPanel("boosts")}
              icon={<Zap className="size-4" />}
              label="Boosts"
            />
            <NavBtn
              active={panel === "ipo"}
              onClick={() => useGame.getState().setPanel("ipo")}
              icon={<Rocket className="size-4" />}
              label="IPO"
            />
          </div>
        </div>
      </div>

      {panel !== "none" && <SidePanel />}
    </>
  );
}

function HireBanner() {
  const lastHire = useGame((s) => s.lastHire);
  if (!lastHire) return null;
  return (
    <div className="pointer-events-none mx-auto mt-2 w-full max-w-md">
      <div className="frame-strong flex items-center gap-3 rounded-2xl bg-surface/95 p-3">
        <img
          src={`/sprites/cast-${lastHire.portrait}.png`}
          alt=""
          className="size-14 rounded-xl border border-line object-cover object-top"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">{lastHire.role}</p>
          <p className="font-display text-lg font-medium leading-tight">{lastHire.name}</p>
          <p className="mt-0.5 truncate text-xs italic text-muted">“{lastHire.quote}”</p>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="frame grid size-11 place-items-center rounded-xl bg-surface text-fg transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-raised active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function NavBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border text-xs font-medium sm:text-sm",
        active
          ? "frame-strong border-line-strong bg-fg text-accent-fg"
          : "frame border-line bg-surface text-fg hover:bg-raised",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SidePanel() {
  const panel = useGame((s) => s.panel);
  const titles: Record<Panel, string> = {
    none: "",
    shop: "Build the floor",
    crew: "The night crew",
    boosts: "Boosts",
    ipo: "File the IPO",
    settings: "Settings",
  };
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-end sm:p-5 sm:pt-20">
      <button
        type="button"
        aria-label="Close panel"
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--color-bg)_62%,transparent)]"
        onClick={() => useGame.setState({ panel: "none" })}
      />
      <section
        className="frame-strong relative flex max-h-[78dvh] w-full flex-col rounded-t-2xl bg-surface sm:max-h-[85dvh] sm:w-[min(100%,26rem)] sm:rounded-2xl"
        role="dialog"
        aria-label={panel}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-medium tracking-tight">{titles[panel]}</h2>
          <button
            type="button"
            aria-label="Close"
            className="grid size-10 place-items-center rounded-lg text-muted hover:text-fg"
            onClick={() => useGame.setState({ panel: "none" })}
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {panel === "shop" && <ShopBody />}
          {panel === "crew" && <CrewBody />}
          {panel === "boosts" && <BoostBody />}
          {panel === "ipo" && <IpoBody />}
          {panel === "settings" && <SettingsBody />}
        </div>
      </section>
    </div>
  );
}

function ShopBody() {
  const s = useGame();
  const nxt = nextStation(s.owned);
  return (
    <div className="space-y-6">
      {nxt && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent">Next hire</p>
          <StationRow def={nxt} level={0} highlight cash={s.cash} />
        </div>
      )}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Floor</p>
        <ul className="space-y-2">
          {STATIONS.filter((st) => (s.owned[st.id] ?? 0) > 0).map((st) => (
            <li key={st.id}>
              <StationRow def={st} level={s.owned[st.id] ?? 0} cash={s.cash} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Upgrades</p>
        <ul className="space-y-2">
          {UPGRADES.map((u) => (
            <li key={u.id}>
              <UpgradeRow def={u} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StationRow({
  def,
  level,
  highlight,
  cash,
}: {
  def: StationDef;
  level: number;
  highlight?: boolean;
  cash: number;
}) {
  const owned = level > 0;
  const cost = owned ? upgradeCost(def, level) : def.cost;
  const can = owned ? canUpgrade(level) && cash >= cost : cash >= def.cost;
  const rate = stationRate(def, Math.max(1, level), 1);
  return (
    <div className={cn("rounded-xl border p-3", highlight ? "frame-strong bg-raised" : "frame bg-bg/50")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <img
            src={`/sprites/cast-${def.character.portrait}.png`}
            alt=""
            className="size-12 shrink-0 rounded-lg border border-line object-cover object-top"
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{def.name}</p>
            <p className="text-xs text-accent">
              {def.character.name} · {def.character.role}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted">{def.blurb}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-teal">
              {formatRate(rate)}
              {level > 0 ? ` · Lv ${level}` : ""}
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={owned ? !canUpgrade(level) || !can : !can}
          onClick={() =>
            owned ? useGame.getState().upgradeStation(def.id) : useGame.getState().buyStation(def.id)
          }
          className={cn(
            "h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums transition-transform duration-150 active:scale-[0.98]",
            can ? "bg-fg text-accent-fg" : "border border-line bg-raised text-muted",
          )}
        >
          {owned ? (canUpgrade(level) ? formatMoney(cost) : "MAX") : formatMoney(cost)}
        </button>
      </div>
    </div>
  );
}

function CrewBody() {
  const owned = useGame((s) => s.owned);
  const log = useGame((s) => s.storyLog);
  const hired = STATIONS.filter((st) => (owned[st.id] ?? 0) > 0);
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted">
        Rae does not hire résumés. She hires the people Halcyon wasted. Each desk is a person with a grudge
        and a craft.
      </p>
      <ul className="space-y-2">
        {hired.map((st) => (
          <li key={st.id} className="frame flex gap-3 rounded-xl bg-bg/50 p-3">
            <img
              src={`/sprites/cast-${st.character.portrait}.png`}
              alt=""
              className="size-14 rounded-lg border border-line object-cover object-top"
            />
            <div className="min-w-0">
              <p className="font-medium">{st.character.name}</p>
              <p className="text-xs uppercase tracking-wider text-accent">{st.character.role}</p>
              <p className="mt-1 text-xs italic leading-snug text-muted">“{st.character.quote}”</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Night log</p>
        <ul className="space-y-1.5">
          {[...log].reverse().map((line, i) => (
            <li key={`${line}-${i}`} className="border-l border-line pl-3 text-xs leading-relaxed text-subtle">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function UpgradeRow({ def }: { def: UpgradeDef }) {
  const s = useGame();
  const level =
    def.id === "wifi"
      ? s.wifi
      : def.id === "click"
        ? s.clickLvl
        : def.id === "hr"
          ? s.hr
          : def.id === "auto"
            ? s.auto
              ? 1
              : 0
            : s.offline
              ? 1
              : 0;
  const maxed = level >= def.max;
  const cost = def.cost(level);
  const can = !maxed && s.cash >= cost;
  const Icon =
    def.id === "wifi"
      ? Wifi
      : def.id === "click"
        ? MousePointer2
        : def.id === "auto"
          ? Users
          : def.id === "hr"
            ? Briefcase
            : Gauge;
  return (
    <div className="frame flex items-center gap-3 rounded-xl bg-bg/50 p-3">
      <div className="grid size-10 place-items-center rounded-lg border border-line bg-raised text-accent">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{def.name}</p>
        <p className="text-xs text-muted">{def.blurb}</p>
        <p className="mt-0.5 font-mono text-xs tabular-nums text-subtle">
          {maxed ? "Owned" : `Tier ${level}/${def.max}`}
        </p>
      </div>
      <button
        type="button"
        disabled={maxed || !can}
        onClick={() => useGame.getState().buyUpgrade(def.id)}
        className={cn(
          "h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums",
          maxed ? "text-muted" : can ? "bg-fg text-accent-fg" : "border border-line text-muted",
        )}
      >
        {maxed ? "—" : formatMoney(cost)}
      </button>
    </div>
  );
}

function BoostBody() {
  const s = useGame();
  const economy = snap(s);
  const ips = totalIncome(economy);
  const giftLive = s.giftBoostUntil - s.time;
  return (
    <div className="space-y-4">
      <div className="frame-strong rounded-xl bg-bg/50 p-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Gift className="size-4 text-accent" />
          Night courier
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Every {GIFT_INTERVAL}s a parcel lands on the floor. Tap it for {GIFT_MULT}× income for {GIFT_BOOST}{" "}
          seconds. Miss it and the next one still comes.
        </p>
        <p className="mt-2 font-mono text-xs tabular-nums text-teal">
          {s.gift
            ? "Waiting on the tiles. Tap the glowing box."
            : giftLive > 0
              ? `Live ${formatTime(giftLive)}`
              : `Next drop ${formatTime(Math.max(0, s.giftDue - s.time))}`}
        </p>
      </div>
      <ul className="space-y-2">
        {BOOSTS.map((b) => (
          <li key={b.id}>
            <BoostRow def={b} ips={ips} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoostRow({ def, ips }: { def: BoostDef; ips: number }) {
  const s = useGame();
  const cost = boostCost(def, ips);
  const cd = (s.boostCd[def.id] ?? 0) - s.time;
  const active = (s.boostUntil[def.id] ?? 0) - s.time;
  const cooling = cd > 0;
  const can = !cooling && s.cash >= cost;
  return (
    <div className="frame rounded-xl bg-bg/50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 font-medium">
            {def.id === "coffee" ? (
              <Coffee className="size-3.5 text-accent" />
            ) : (
              <Zap className="size-3.5 text-teal" />
            )}
            {def.name}
          </p>
          <p className="mt-0.5 text-xs text-muted">{def.blurb}</p>
          {active > 0 && (
            <p className="mt-1 font-mono text-xs tabular-nums text-teal">Live {formatTime(active)}</p>
          )}
          {cooling && active <= 0 && (
            <p className="mt-1 font-mono text-xs tabular-nums text-subtle">Cooldown {formatTime(cd)}</p>
          )}
        </div>
        <button
          type="button"
          disabled={!can}
          onClick={() => useGame.getState().activateBoost(def.id)}
          className={cn(
            "h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums",
            can ? "bg-fg text-accent-fg" : "border border-line text-muted",
          )}
        >
          {formatMoney(cost)}
        </button>
      </div>
    </div>
  );
}

function IpoBody() {
  const s = useGame();
  const economy = snap(s);
  const ready = canIpo(economy);
  const have = ownedCount(s.owned);
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted">
        File the S-1. The floor resets to cardboard. Reputation stays. Each IPO doubles the next run — and
        moves Rae one roof closer to Halcyon.
      </p>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div className="frame rounded-xl bg-bg/50 p-3">
          <dt className="text-xs text-muted">Current multiplier</dt>
          <dd className="mt-1 font-mono tabular-nums">×{prestigeMult(s.prestige)}</dd>
        </div>
        <div className="frame rounded-xl bg-bg/50 p-3">
          <dt className="text-xs text-muted">After filing</dt>
          <dd className="mt-1 font-mono tabular-nums">×{prestigeMult(s.prestige + 1)}</dd>
        </div>
        <div className="frame rounded-xl bg-bg/50 p-3">
          <dt className="text-xs text-muted">Desks owned</dt>
          <dd className="mt-1 font-mono tabular-nums">
            {have}/{IPO_STATIONS_REQUIRED}
          </dd>
        </div>
        <div className="frame rounded-xl bg-bg/50 p-3">
          <dt className="text-xs text-muted">Crew on payroll</dt>
          <dd className="mt-1 font-mono tabular-nums">{staffCount(s.owned)}</dd>
        </div>
      </dl>
      <p className="text-xs text-subtle">{ipoRequirementLabel(economy)}</p>
      <button
        type="button"
        disabled={!ready}
        onClick={() => useGame.getState().ipo()}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium",
          ready ? "bg-fg text-accent-fg" : "frame text-muted",
        )}
      >
        <Rocket className="size-4" />
        File IPO
      </button>
    </div>
  );
}

function SettingsBody() {
  const muted = useGame((s) => s.muted);
  const click = clickPower(snap(useGame.getState()));
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Progress saves on this device. Filing an IPO is the prestige reset. The courier does not wait.
      </p>
      <button
        type="button"
        onClick={() => useGame.getState().toggleMuted()}
        className="frame flex h-12 w-full items-center justify-between rounded-xl px-4 text-sm"
      >
        Sound
        <span className="text-muted">{muted ? "Off" : "On"}</span>
      </button>
      <p className="font-mono text-xs tabular-nums text-subtle">Click power {formatMoney(click)}</p>
      <button
        type="button"
        onClick={() => useGame.getState().wipe()}
        className="frame flex h-12 w-full items-center justify-center rounded-xl text-sm text-danger"
      >
        Reset floor
      </button>
    </div>
  );
}
