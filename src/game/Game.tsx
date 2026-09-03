import { useEffect, useState } from "react";
import { Landmark, Play } from "lucide-react";
import { formatMoney } from "./format";
import { prestigeMult } from "./economy";
import { OPENING } from "./catalog";
import { hydrateMenu, useGame } from "./store";
import { unlockAudio, resumeAudioOnVisible, setMuted } from "./audio";
import { OfficeCanvas } from "./OfficeCanvas";
import { Hud } from "./Hud";

export function Game() {
  const playing = useGame((s) => s.playing);
  const hydrated = useGame((s) => s.hydrated);
  const hasSave = useGame((s) => s.hasSave);
  const awayCash = useGame((s) => s.awayCash);

  useEffect(() => {
    hydrateMenu();
    setMuted(useGame.getState().muted);
    return resumeAudioOnVisible();
  }, []);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") useGame.getState().persist();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <OfficeCanvas />
      <Hud />
      {!playing && <StartOverlay hydrated={hydrated} hasSave={hasSave} />}
      {playing && awayCash > 1 && <AwayModal amount={awayCash} />}
    </main>
  );
}

function StartOverlay({ hydrated, hasSave }: { hydrated: boolean; hasSave: boolean }) {
  const prestige = useGame((s) => s.prestige);
  const cash = useGame((s) => s.cash);

  function begin(fresh: boolean) {
    unlockAudio();
    useGame.getState().start(fresh);
  }

  return (
    <div className="absolute inset-0 z-30 flex items-end sm:items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/sprites/city.jpg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,20,0.28)_0%,rgba(11,16,20,0.78)_48%,#0b1014_100%)]" />
      <section className="relative z-10 w-full px-5 pb-10 pt-20 sm:mx-auto sm:max-w-lg sm:pb-16">
        <div className="frame-strong rounded-2xl bg-surface/80 p-5 backdrop-blur-sm sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">A Friday. 11:47pm.</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
            Hustle HQ
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{OPENING}</p>
          <ul className="mt-5 space-y-1.5 text-sm text-subtle">
            <li>Tap glowing pads to hire the crew.</li>
            <li>Every minute a courier gift lands. Grab it for 3× income.</li>
            <li>File an IPO. Buy the building that fired you.</li>
          </ul>
          {hydrated && hasSave && (
            <p className="mt-5 font-mono text-xs tabular-nums text-teal">
              Saved {formatMoney(cash)}
              {prestige > 0 ? ` · ×${prestigeMult(prestige)}` : ""}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {hydrated && hasSave && (
              <button
                type="button"
                onClick={() => begin(false)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-fg text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.98]"
              >
                <Play className="size-4" />
                Continue
              </button>
            )}
            <button
              type="button"
              onClick={() => begin(true)}
              className={
                hydrated && hasSave
                  ? "frame flex h-12 flex-1 items-center justify-center rounded-xl text-sm font-medium text-fg"
                  : "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-fg text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.98]"
              }
            >
              {hydrated && hasSave ? (
                "New floor"
              ) : (
                <>
                  <Play className="size-4" />
                  Open at midnight
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AwayModal({ amount }: { amount: number }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-[color-mix(in_oklab,var(--color-bg)_58%,transparent)] p-6">
      <div className="frame-strong w-full max-w-sm rounded-2xl bg-surface p-6">
        <Landmark className="size-5 text-accent" />
        <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">The Hum kept going</h2>
        <p className="mt-2 text-sm text-muted">Night crew filed a few invoices while you were gone.</p>
        <p className="mt-4 font-mono text-3xl tabular-nums text-fg">{formatMoney(amount)}</p>
        <button
          type="button"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-fg text-sm font-medium text-accent-fg"
          onClick={() => {
            setOpen(false);
            useGame.getState().dismissAway();
          }}
        >
          Collect
        </button>
      </div>
    </div>
  );
}
