import {
  BOOSTS,
  GIFT_MULT,
  IPO_CASH_REQUIRED,
  IPO_STATIONS_REQUIRED,
  MAX_STATION_LEVEL,
  STATIONS,
  STATION_BY_ID,
  UPGRADE_COST_GROWTH,
  UPGRADE_COST_RATIO,
  UPGRADE_RATE,
} from "./catalog";
import type { BoostDef, StationDef } from "./types";

export type EconomySnap = {
  cash: number;
  lifetime: number;
  prestige: number;
  owned: Record<string, number>;
  wifi: number;
  clickLvl: number;
  hr: number;
  boostUntil: Record<string, number>;
  giftBoostUntil: number;
  time: number;
  combo: number;
};

export function prestigeMult(prestige: number): number {
  return 2 ** prestige;
}

export function staffCount(owned: Record<string, number>): number {
  let n = 0;
  for (const s of STATIONS) {
    if ((owned[s.id] ?? 0) > 0) n += s.staff;
  }
  return n;
}

export function ownedCount(owned: Record<string, number>): number {
  return STATIONS.reduce((a, s) => a + ((owned[s.id] ?? 0) > 0 ? 1 : 0), 0);
}

export function buildingBuff(owned: Record<string, number>): number {
  let m = 1;
  for (const s of STATIONS) {
    if ((owned[s.id] ?? 0) > 0 && s.buff) m += s.buff;
  }
  if (ownedCount(owned) >= 5) m += 0.08;
  return m;
}

export function incomeBoost(snap: EconomySnap): number {
  let m = 1;
  for (const b of BOOSTS) {
    if (b.kind !== "income") continue;
    if ((snap.boostUntil[b.id] ?? 0) > snap.time) m *= b.mult;
  }
  if (snap.giftBoostUntil > snap.time) m *= GIFT_MULT;
  return m;
}

export function clickBoost(snap: EconomySnap): number {
  let m = 1;
  for (const b of BOOSTS) {
    if (b.kind !== "click") continue;
    if ((snap.boostUntil[b.id] ?? 0) > snap.time) m *= b.mult;
  }
  return m;
}

export function globalMult(snap: EconomySnap): number {
  const wifi = 1 + 0.12 * snap.wifi;
  const hr = 1 + 0.05 * staffCount(snap.owned) * snap.hr;
  return prestigeMult(snap.prestige) * buildingBuff(snap.owned) * wifi * hr * incomeBoost(snap);
}

export function stationRate(def: StationDef, level: number, gmult: number): number {
  if (level <= 0) return 0;
  return def.baseRate * (1 + UPGRADE_RATE * (level - 1)) * gmult;
}

export function totalIncome(snap: EconomySnap): number {
  const g = globalMult(snap);
  let sum = 0;
  for (const s of STATIONS) {
    sum += stationRate(s, snap.owned[s.id] ?? 0, g);
  }
  return sum;
}

export function clickPower(snap: EconomySnap): number {
  const base = 1.2 * 3 ** snap.clickLvl;
  const combo = 1 + Math.min(12, snap.combo) * 0.16;
  return base * prestigeMult(snap.prestige) * clickBoost(snap) * combo * (1 + 0.04 * snap.wifi);
}

export function upgradeCost(def: StationDef, level: number): number {
  const base = Math.max(def.cost, def.baseRate * 9, 14);
  return base * UPGRADE_COST_RATIO * UPGRADE_COST_GROWTH ** Math.max(0, level - 1);
}

export function canUpgrade(level: number): boolean {
  return level > 0 && level < MAX_STATION_LEVEL;
}

export function nextStation(owned: Record<string, number>): StationDef | null {
  for (const s of STATIONS) {
    if ((owned[s.id] ?? 0) <= 0) return s;
  }
  return null;
}

export function boostCost(def: BoostDef, ips: number): number {
  const window = def.kind === "instant" ? def.instantSeconds : def.duration;
  const extra = def.kind === "instant" ? 1 : Math.max(0, def.mult - 1);
  return Math.max(def.minCost, ips * window * extra * def.costFactor);
}

export function canIpo(snap: EconomySnap): boolean {
  return ownedCount(snap.owned) >= IPO_STATIONS_REQUIRED || snap.cash >= IPO_CASH_REQUIRED;
}

export function ipoRequirementLabel(snap: EconomySnap): string {
  const have = ownedCount(snap.owned);
  if (have >= IPO_STATIONS_REQUIRED || snap.cash >= IPO_CASH_REQUIRED) {
    return "The S-1 is warm. File it.";
  }
  return `Hire ${IPO_STATIONS_REQUIRED} desks (${have}) or hold $2M. Then buy the building.`;
}

export function stationAt(col: number, row: number): StationDef | undefined {
  return STATIONS.find((s) => s.col === col && s.row === row);
}

export { STATION_BY_ID };
