import type { SaveV1 } from "./types";
import { GIFT_FIRST, STATIONS } from "./catalog";

export const SAVE_KEY = "hustle-hq-save-v1";
export const SAVE_VERSION = 2 as const;

export function defaultSave(): SaveV1 {
  const owned: Record<string, number> = {};
  const pending: Record<string, number> = {};
  for (const s of STATIONS) {
    owned[s.id] = s.id === "cardboard" ? 1 : 0;
    pending[s.id] = 0;
  }
  return {
    version: SAVE_VERSION,
    cash: 12,
    lifetime: 12,
    prestige: 0,
    owned,
    pending,
    wifi: 0,
    clickLvl: 0,
    auto: false,
    offline: false,
    hr: 0,
    boostUntil: {},
    boostCd: {},
    time: 0,
    lastWall: Date.now(),
    muted: false,
    gift: null,
    giftDue: GIFT_FIRST,
    giftBoostUntil: 0,
    storyLog: ["11:47pm. Rae keeps the badge. For spite."],
  };
}

export function migrate(raw: unknown): SaveV1 {
  const base = defaultSave();
  if (!raw || typeof raw !== "object") return base;
  const s = raw as Partial<SaveV1>;
  return {
    ...base,
    ...s,
    version: SAVE_VERSION,
    owned: { ...base.owned, ...(s.owned ?? {}) },
    pending: { ...base.pending, ...(s.pending ?? {}) },
    boostUntil: { ...(s.boostUntil ?? {}) },
    boostCd: { ...(s.boostCd ?? {}) },
    gift: s.gift ?? null,
    giftDue: s.giftDue ?? GIFT_FIRST,
    giftBoostUntil: s.giftBoostUntil ?? 0,
    storyLog: s.storyLog?.length ? s.storyLog.slice(-8) : base.storyLog,
  };
}

export function loadSave(): SaveV1 {
  if (typeof window === "undefined") return defaultSave();
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    return migrate(JSON.parse(raw));
  } catch {
    return defaultSave();
  }
}

export function writeSave(save: SaveV1) {
  if (typeof window === "undefined") return;
  try {
    const blob = JSON.stringify({ ...save, lastWall: Date.now() });
    window.localStorage.setItem(SAVE_KEY, blob);
  } catch {
    /* private mode / quota */
  }
}

export function clearSave() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export function hasProgress(save: SaveV1): boolean {
  const ownedCount = Object.values(save.owned).filter((n) => n > 0).length;
  return save.lifetime > 20 || ownedCount > 1 || save.prestige > 0;
}
