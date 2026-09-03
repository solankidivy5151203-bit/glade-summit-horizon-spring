export type StationId = string;
export type BoostId = string;
export type UpgradeId = "wifi" | "click" | "auto" | "offline" | "hr";

export type Character = {
  name: string;
  role: string;
  quote: string;
  portrait: number;
};

export type StationDef = {
  id: StationId;
  name: string;
  blurb: string;
  cost: number;
  baseRate: number;
  col: number;
  row: number;
  furn: number;
  staff: number;
  buff: number;
  scale: number;
  character: Character;
};

export type BoostDef = {
  id: BoostId;
  name: string;
  blurb: string;
  mult: number;
  duration: number;
  cooldown: number;
  kind: "income" | "click" | "instant";
  instantSeconds: number;
  costFactor: number;
  minCost: number;
};

export type UpgradeDef = {
  id: UpgradeId;
  name: string;
  blurb: string;
  max: number;
  cost: (level: number) => number;
};

export type GiftFlavor = {
  id: string;
  name: string;
  from: string;
  blurb: string;
};

export type FloorGift = {
  col: number;
  row: number;
  flavor: number;
  until: number;
};

export type HireBeat = {
  name: string;
  role: string;
  quote: string;
  portrait: number;
  at: number;
};

export type SaveV1 = {
  version: 1 | 2;
  cash: number;
  lifetime: number;
  prestige: number;
  owned: Record<string, number>;
  pending: Record<string, number>;
  wifi: number;
  clickLvl: number;
  auto: boolean;
  offline: boolean;
  hr: number;
  boostUntil: Record<string, number>;
  boostCd: Record<string, number>;
  time: number;
  lastWall: number;
  muted: boolean;
  gift: FloorGift | null;
  giftDue: number;
  giftBoostUntil: number;
  storyLog: string[];
};
