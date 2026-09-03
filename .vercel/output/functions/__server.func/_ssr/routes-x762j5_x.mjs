import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Volume2, c as Store, d as Play, f as MousePointer2, g as Briefcase, h as Coffee, i as VolumeX, l as Settings, m as Gauge, n as X, o as Users, p as Landmark, r as Wifi, t as Zap, u as Rocket } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-x762j5_x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUFFIXES = [
	"",
	"K",
	"M",
	"B",
	"T",
	"Qa",
	"Qi",
	"Sx",
	"Sp",
	"Oc",
	"No",
	"Dc"
];
function formatMoney(n, digits) {
	if (!Number.isFinite(n)) return "$0";
	if (n < 0) return `-${formatMoney(-n, digits)}`;
	if (n < 1e3) {
		if (n < 10) return `$${n.toFixed(1)}`;
		return `$${Math.floor(n)}`;
	}
	let e = Math.floor(Math.log10(n) / 3);
	if (e >= SUFFIXES.length) e = SUFFIXES.length - 1;
	const v = n / 1e3 ** e;
	const d = digits ?? (v >= 100 ? 0 : v >= 10 ? 1 : 2);
	return `$${v.toFixed(d)}${SUFFIXES[e]}`;
}
function formatRate(n) {
	return `${formatMoney(n)}/s`;
}
function formatTime(seconds) {
	const s = Math.max(0, Math.ceil(seconds));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return m > 0 ? `${m}:${r.toString().padStart(2, "0")}` : `0:${r.toString().padStart(2, "0")}`;
}
var STATIONS = [
	{
		id: "cardboard",
		name: "Cardboard Desk",
		blurb: "The garage years. Tape optional.",
		cost: 0,
		baseRate: 2.4,
		col: 1,
		row: 1,
		furn: 0,
		staff: 0,
		buff: 0,
		scale: .92
	},
	{
		id: "ikea",
		name: "Flat-Pack Desk",
		blurb: "Allen wrench not included. Income is.",
		cost: 22,
		baseRate: 7.5,
		col: 3,
		row: 1,
		furn: 1,
		staff: 0,
		buff: 0,
		scale: 1
	},
	{
		id: "dual",
		name: "Dual Monitors",
		blurb: "Email on the left. Actual work on the right.",
		cost: 110,
		baseRate: 24,
		col: 5,
		row: 1,
		furn: 2,
		staff: 0,
		buff: 0,
		scale: 1.08
	},
	{
		id: "standing",
		name: "Standing Desk",
		blurb: "Calves of a middle manager.",
		cost: 420,
		baseRate: 78,
		col: 7,
		row: 1,
		furn: 3,
		staff: 1,
		buff: 0,
		scale: 1.05
	},
	{
		id: "intern",
		name: "Intern Cubicle",
		blurb: "They asked if exposure is taxable.",
		cost: 1600,
		baseRate: 250,
		col: 1,
		row: 3,
		furn: 4,
		staff: 1,
		buff: 0,
		scale: 1.1
	},
	{
		id: "coffee",
		name: "Espresso Bar",
		blurb: "The real infrastructure. Permanent +15% income.",
		cost: 6200,
		baseRate: 820,
		col: 3,
		row: 3,
		furn: 5,
		staff: 1,
		buff: .15,
		scale: 1.05
	},
	{
		id: "team",
		name: "Team Pod",
		blurb: "Four people. One Slack channel.",
		cost: 24e3,
		baseRate: 2700,
		col: 5,
		row: 3,
		furn: 6,
		staff: 3,
		buff: 0,
		scale: 1.18
	},
	{
		id: "conference",
		name: "Conference Room",
		blurb: "This could have been an email.",
		cost: 96e3,
		baseRate: 8800,
		col: 7,
		row: 3,
		furn: 6,
		staff: 2,
		buff: 0,
		scale: 1.22
	},
	{
		id: "sales",
		name: "Sales Floor",
		blurb: "Always be following up.",
		cost: 38e4,
		baseRate: 29e3,
		col: 1,
		row: 5,
		furn: 4,
		staff: 4,
		buff: 0,
		scale: 1.12
	},
	{
		id: "server",
		name: "Server Closet",
		blurb: "The fan is the white noise. Permanent +20%.",
		cost: 15e5,
		baseRate: 96e3,
		col: 3,
		row: 5,
		furn: 7,
		staff: 1,
		buff: .2,
		scale: 1.15
	},
	{
		id: "design",
		name: "Design Studio",
		blurb: "Figma is a lifestyle.",
		cost: 58e5,
		baseRate: 32e4,
		col: 5,
		row: 5,
		furn: 2,
		staff: 2,
		buff: 0,
		scale: 1.1
	},
	{
		id: "trading",
		name: "Trading Pit",
		blurb: "Numbers go up. Legally.",
		cost: 22e6,
		baseRate: 11e5,
		col: 7,
		row: 5,
		furn: 2,
		staff: 3,
		buff: 0,
		scale: 1.14
	},
	{
		id: "csuite",
		name: "Corner Office",
		blurb: "The door is glass. The ego is not. +35%.",
		cost: 86e6,
		baseRate: 38e5,
		col: 2,
		row: 6,
		furn: 3,
		staff: 2,
		buff: .35,
		scale: 1.2
	},
	{
		id: "datacenter",
		name: "Data Hall",
		blurb: "A room that hums in compound interest.",
		cost: 34e7,
		baseRate: 13e6,
		col: 4,
		row: 6,
		furn: 7,
		staff: 2,
		buff: .1,
		scale: 1.25
	},
	{
		id: "helipad",
		name: "Helipad",
		blurb: "For the quarterly offsite, obviously.",
		cost: 135e7,
		baseRate: 48e6,
		col: 6,
		row: 6,
		furn: -1,
		staff: 1,
		buff: .1,
		scale: 1.3
	}
];
var STATION_BY_ID = Object.fromEntries(STATIONS.map((s) => [s.id, s]));
var BOOSTS = [
	{
		id: "coffee",
		name: "Coffee Rush",
		blurb: "2× income. The good beans.",
		mult: 2,
		duration: 30,
		cooldown: 80,
		kind: "income",
		instantSeconds: 0,
		costFactor: .32,
		minCost: 12
	},
	{
		id: "overtime",
		name: "Overtime",
		blurb: "3× income. Lights stay on.",
		mult: 3,
		duration: 20,
		cooldown: 110,
		kind: "income",
		instantSeconds: 0,
		costFactor: .38,
		minCost: 40
	},
	{
		id: "allhands",
		name: "All-Hands",
		blurb: "5× click power. Everyone is on mute.",
		mult: 5,
		duration: 25,
		cooldown: 90,
		kind: "click",
		instantSeconds: 0,
		costFactor: .28,
		minCost: 18
	},
	{
		id: "vc",
		name: "VC Drop",
		blurb: "Instant cash. They did not read the deck.",
		mult: 1,
		duration: 0,
		cooldown: 150,
		kind: "instant",
		instantSeconds: 55,
		costFactor: .42,
		minCost: 30
	},
	{
		id: "hackathon",
		name: "Hackathon",
		blurb: "4× income. Pizza is a food group.",
		mult: 4,
		duration: 40,
		cooldown: 180,
		kind: "income",
		instantSeconds: 0,
		costFactor: .4,
		minCost: 80
	},
	{
		id: "press",
		name: "Press Cycle",
		blurb: "2.5× income. We are thrilled to announce.",
		mult: 2.5,
		duration: 50,
		cooldown: 160,
		kind: "income",
		instantSeconds: 0,
		costFactor: .36,
		minCost: 60
	}
];
var BOOST_BY_ID = Object.fromEntries(BOOSTS.map((b) => [b.id, b]));
var UPGRADES = [
	{
		id: "wifi",
		name: "Gigabit Wi-Fi",
		blurb: "+12% income per tier. Buffering is for other floors.",
		max: 8,
		cost: (level) => 280 * 7.5 ** level
	},
	{
		id: "click",
		name: "Heavy Clickers",
		blurb: "Tapping desks pays more. Mechanical switches, obviously.",
		max: 10,
		cost: (level) => 70 * 5.4 ** level
	},
	{
		id: "auto",
		name: "Office Manager",
		blurb: "Auto-collects cash piles so you can keep buying.",
		max: 1,
		cost: () => 18e3
	},
	{
		id: "offline",
		name: "Night Owls",
		blurb: "Earn 50% while away, up to eight hours.",
		max: 1,
		cost: () => 6500
	},
	{
		id: "hr",
		name: "HR Handbook",
		blurb: "+5% income per hired desk. Morale, as a spreadsheet.",
		max: 5,
		cost: (level) => 2200 * 6 ** level
	}
];
var UPGRADE_RATE = .2;
var UPGRADE_COST_RATIO = .58;
var UPGRADE_COST_GROWTH = 1.145;
function prestigeMult(prestige) {
	return 2 ** prestige;
}
function staffCount(owned) {
	let n = 0;
	for (const s of STATIONS) if ((owned[s.id] ?? 0) > 0) n += s.staff;
	return n;
}
function ownedCount(owned) {
	return STATIONS.reduce((a, s) => a + ((owned[s.id] ?? 0) > 0 ? 1 : 0), 0);
}
function buildingBuff(owned) {
	let m = 1;
	for (const s of STATIONS) if ((owned[s.id] ?? 0) > 0 && s.buff) m += s.buff;
	if (ownedCount(owned) >= 5) m += .08;
	return m;
}
function incomeBoost(snap) {
	let m = 1;
	for (const b of BOOSTS) {
		if (b.kind !== "income") continue;
		if ((snap.boostUntil[b.id] ?? 0) > snap.time) m *= b.mult;
	}
	return m;
}
function clickBoost(snap) {
	let m = 1;
	for (const b of BOOSTS) {
		if (b.kind !== "click") continue;
		if ((snap.boostUntil[b.id] ?? 0) > snap.time) m *= b.mult;
	}
	return m;
}
function globalMult(snap) {
	const wifi = 1 + .12 * snap.wifi;
	const hr = 1 + .05 * staffCount(snap.owned) * snap.hr;
	return prestigeMult(snap.prestige) * buildingBuff(snap.owned) * wifi * hr * incomeBoost(snap);
}
function stationRate(def, level, gmult) {
	if (level <= 0) return 0;
	return def.baseRate * (1 + UPGRADE_RATE * (level - 1)) * gmult;
}
function totalIncome(snap) {
	const g = globalMult(snap);
	let sum = 0;
	for (const s of STATIONS) sum += stationRate(s, snap.owned[s.id] ?? 0, g);
	return sum;
}
function clickPower(snap) {
	const base = 1.2 * 3 ** snap.clickLvl;
	const combo = 1 + Math.min(12, snap.combo) * .16;
	return base * prestigeMult(snap.prestige) * clickBoost(snap) * combo * (1 + .04 * snap.wifi);
}
function upgradeCost(def, level) {
	return Math.max(def.cost, def.baseRate * 9, 14) * UPGRADE_COST_RATIO * UPGRADE_COST_GROWTH ** Math.max(0, level - 1);
}
function canUpgrade(level) {
	return level > 0 && level < 25;
}
function nextStation(owned) {
	for (const s of STATIONS) if ((owned[s.id] ?? 0) <= 0) return s;
	return null;
}
function boostCost(def, ips) {
	const window = def.kind === "instant" ? def.instantSeconds : def.duration;
	const extra = def.kind === "instant" ? 1 : Math.max(0, def.mult - 1);
	return Math.max(def.minCost, ips * window * extra * def.costFactor);
}
function canIpo(snap) {
	return ownedCount(snap.owned) >= 8 || snap.cash >= 2e6;
}
function ipoRequirementLabel(snap) {
	const have = ownedCount(snap.owned);
	if (have >= 8 || snap.cash >= 2e6) return "Ready to file.";
	return `Own 8 desks (${have}) or hold $2M.`;
}
var SAVE_KEY = "hustle-hq-save-v1";
function defaultSave() {
	const owned = {};
	const pending = {};
	for (const s of STATIONS) {
		owned[s.id] = s.id === "cardboard" ? 1 : 0;
		pending[s.id] = 0;
	}
	return {
		version: 1,
		cash: 8,
		lifetime: 8,
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
		muted: false
	};
}
function migrate(raw) {
	const base = defaultSave();
	if (!raw || typeof raw !== "object") return base;
	const s = raw;
	return {
		...base,
		...s,
		version: 1,
		owned: {
			...base.owned,
			...s.owned ?? {}
		},
		pending: {
			...base.pending,
			...s.pending ?? {}
		},
		boostUntil: { ...s.boostUntil ?? {} },
		boostCd: { ...s.boostCd ?? {} }
	};
}
function loadSave() {
	if (typeof window === "undefined") return defaultSave();
	try {
		const raw = window.localStorage.getItem(SAVE_KEY);
		if (!raw) return defaultSave();
		return migrate(JSON.parse(raw));
	} catch {
		return defaultSave();
	}
}
function writeSave(save) {
	if (typeof window === "undefined") return;
	try {
		const blob = JSON.stringify({
			...save,
			lastWall: Date.now()
		});
		window.localStorage.setItem(SAVE_KEY, blob);
	} catch {}
}
function clearSave() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(SAVE_KEY);
	} catch {}
}
function hasProgress(save) {
	const ownedCount = Object.values(save.owned).filter((n) => n > 0).length;
	return save.lifetime > 20 || ownedCount > 1 || save.prestige > 0;
}
var bus = null;
var muted = false;
function getBus() {
	if (typeof window === "undefined") return null;
	if (bus) return bus;
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return null;
	const ctx = new AC({ latencyHint: "interactive" });
	const master = ctx.createGain();
	const sfx = ctx.createGain();
	sfx.gain.value = .7;
	master.gain.value = muted ? 0 : .85;
	sfx.connect(master);
	master.connect(ctx.destination);
	bus = {
		ctx,
		master,
		sfx
	};
	return bus;
}
function unlockAudio() {
	const b = getBus();
	if (!b) return;
	if (b.ctx.state === "suspended") b.ctx.resume();
}
function setMuted(next) {
	muted = next;
	const b = bus;
	if (!b) return;
	b.master.gain.setTargetAtTime(next ? 0 : .85, b.ctx.currentTime, .03);
}
function env(gain, ctx, peak, attack, release) {
	const t = ctx.currentTime;
	gain.gain.cancelScheduledValues(t);
	gain.gain.setValueAtTime(1e-4, t);
	gain.gain.exponentialRampToValueAtTime(Math.max(2e-4, peak), t + attack);
	gain.gain.exponentialRampToValueAtTime(1e-4, t + attack + release);
}
function tone(freq, dur, type, peak, slide = 0) {
	const b = getBus();
	if (!b || muted) return;
	const osc = b.ctx.createOscillator();
	const g = b.ctx.createGain();
	osc.type = type;
	osc.frequency.setValueAtTime(freq, b.ctx.currentTime);
	if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), b.ctx.currentTime + dur);
	env(g, b.ctx, peak, .01, dur);
	osc.connect(g);
	g.connect(b.sfx);
	osc.start();
	osc.stop(b.ctx.currentTime + dur + .05);
	osc.onended = () => {
		osc.disconnect();
		g.disconnect();
	};
}
function noise(dur, peak, hp = 800) {
	const b = getBus();
	if (!b || muted) return;
	const n = b.ctx.createBuffer(1, Math.floor(b.ctx.sampleRate * dur), b.ctx.sampleRate);
	const data = n.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	const src = b.ctx.createBufferSource();
	src.buffer = n;
	const filter = b.ctx.createBiquadFilter();
	filter.type = "highpass";
	filter.frequency.value = hp;
	const g = b.ctx.createGain();
	env(g, b.ctx, peak, .005, dur * .9);
	src.connect(filter);
	filter.connect(g);
	g.connect(b.sfx);
	src.start();
	src.stop(b.ctx.currentTime + dur);
}
var sfx = {
	click() {
		tone(880 * (1 + (Math.random() * .16 - .08)), .05, "triangle", .07);
	},
	collect() {
		const jitter = 1 + (Math.random() * .12 - .06);
		tone(1320 * jitter, .08, "sine", .09, 280);
		tone(1760 * jitter, .05, "triangle", .04);
	},
	buy() {
		tone(392, .12, "square", .06);
		tone(523, .16, "triangle", .08, 80);
		tone(784, .22, "sine", .05);
	},
	deny() {
		tone(140, .12, "sawtooth", .05, -40);
	},
	boost() {
		tone(262, .18, "sine", .07, 220);
		tone(392, .22, "triangle", .06, 180);
		noise(.12, .04, 400);
	},
	ipo() {
		tone(523, .18, "triangle", .08);
		setTimeout(() => tone(659, .18, "triangle", .08), 90);
		setTimeout(() => tone(784, .28, "sine", .1), 180);
		setTimeout(() => tone(1046, .4, "sine", .07), 280);
	},
	upgrade() {
		tone(660, .1, "triangle", .07, 120);
		tone(990, .14, "sine", .05);
	}
};
function resumeAudioOnVisible() {
	if (typeof document === "undefined") return;
	const go = () => {
		if (document.visibilityState === "visible") unlockAudio();
	};
	document.addEventListener("visibilitychange", go);
	return () => document.removeEventListener("visibilitychange", go);
}
var eventSeq = 1;
var saveAcc = 0;
function snapOf(s) {
	return {
		cash: s.cash,
		lifetime: s.lifetime,
		prestige: s.prestige,
		owned: s.owned,
		wifi: s.wifi,
		clickLvl: s.clickLvl,
		hr: s.hr,
		boostUntil: s.boostUntil,
		time: s.time,
		combo: s.combo
	};
}
function toSave(s) {
	return {
		version: 1,
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
		muted: s.muted
	};
}
function pushEvent(list, kind, text) {
	const next = list.filter((e) => e.at > performance.now() - 1400).slice(-18);
	next.push({
		id: eventSeq++,
		kind,
		text,
		x: .5,
		y: .42,
		at: performance.now()
	});
	return next;
}
var useGame = create()((set, get) => ({
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
	tick: (dt) => {
		const s = get();
		if (!s.playing) return;
		const time = s.time + dt;
		const pending = { ...s.pending };
		const economy = snapOf({
			...s,
			time
		});
		let cash = s.cash;
		let lifetime = s.lifetime;
		const shake = Math.max(0, s.shake - dt * 2.4);
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
			writeSave(toSave({
				...s,
				cash,
				lifetime,
				pending,
				time
			}));
		}
		set({
			cash,
			lifetime,
			pending,
			time,
			shake
		});
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
				combo: 0
			});
			writeSave(d);
			setMuted(d.muted);
			return;
		}
		const loaded = loadSave();
		const now = Date.now();
		const elapsed = Math.max(0, Math.min((now - loaded.lastWall) / 1e3, 28800));
		let away = 0;
		if (elapsed > 50) {
			const ips = totalIncome(snapOf({
				...loaded,
				combo: 0
			}));
			const rate = loaded.offline ? .5 : .12;
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
			combo: 0
		});
		setMuted(loaded.muted);
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
		set({
			cash: s.cash - def.cost,
			owned: {
				...s.owned,
				[id]: 1
			},
			events: pushEvent(s.events, "buy", def.name),
			shake: Math.min(1, s.shake + .35)
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
			owned: {
				...s.owned,
				[id]: level + 1
			},
			events: pushEvent(s.events, "buy", `Lv ${level + 1}`)
		});
		sfx.upgrade();
		get().persist();
		return true;
	},
	buyUpgrade: (id) => {
		const s = get();
		const def = UPGRADES.find((u) => u.id === id);
		if (!def) return false;
		const level = id === "wifi" ? s.wifi : id === "click" ? s.clickLvl : id === "hr" ? s.hr : id === "auto" ? s.auto ? 1 : 0 : s.offline ? 1 : 0;
		if (level >= def.max) return false;
		const cost = def.cost(level);
		if (s.cash < cost) {
			sfx.deny();
			return false;
		}
		const patch = { cash: s.cash - cost };
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
		const boostCd = {
			...s.boostCd,
			[id]: s.time + def.cooldown
		};
		if (def.kind === "instant") {
			const gain = totalIncome(snapOf(s)) * def.instantSeconds;
			cash += gain;
			lifetime += gain;
		} else boostUntil[id] = s.time + def.duration;
		set({
			cash,
			lifetime,
			boostUntil,
			boostCd,
			events: pushEvent(s.events, "boost", def.name),
			shake: Math.min(1, s.shake + .25)
		});
		sfx.boost();
		get().persist();
		return true;
	},
	collect: (id) => {
		const s = get();
		const amt = s.pending[id] ?? 0;
		if (amt <= .5) return 0;
		set({
			cash: s.cash + amt,
			lifetime: s.lifetime + amt,
			pending: {
				...s.pending,
				[id]: 0
			}
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
		if (sum <= .5) return 0;
		set({
			cash: s.cash + sum,
			lifetime: s.lifetime + sum,
			pending
		});
		sfx.collect();
		return sum;
	},
	clickStation: (id) => {
		const s = get();
		if (!STATION_BY_ID[id]) return 0;
		if ((s.owned[id] ?? 0) <= 0) {
			get().buyStation(id);
			return 0;
		}
		const now = s.time;
		const combo = now - s.comboAt < .75 ? s.combo + 1 : 1;
		const gain = (s.pending[id] ?? 0) + clickPower(snapOf({
			...s,
			combo
		}));
		set({
			cash: s.cash + gain,
			lifetime: s.lifetime + gain,
			pending: {
				...s.pending,
				[id]: 0
			},
			combo,
			comboAt: now,
			events: pushEvent(s.events, "cash", `+${gain < 10 ? gain.toFixed(1) : Math.floor(gain)}`)
		});
		sfx.click();
		return gain;
	},
	ipo: () => {
		const s = get();
		if (!canIpo(snapOf(s))) {
			sfx.deny();
			return false;
		}
		const prestige = s.prestige + 1;
		const owned = {};
		const pending = {};
		for (const st of STATIONS) {
			owned[st.id] = st.id === "cardboard" ? 1 : 0;
			pending[st.id] = 0;
		}
		set({
			prestige,
			owned,
			pending,
			cash: 40 * 8 ** Math.min(prestige, 5),
			wifi: 0,
			clickLvl: 0,
			auto: false,
			hr: 0,
			boostUntil: {},
			boostCd: {},
			combo: 0,
			panel: "none",
			events: pushEvent(s.events, "ipo", `IPO ×${prestigeMult(prestige)}`),
			shake: 1
		});
		sfx.ipo();
		get().persist();
		return true;
	},
	setPanel: (panel) => set({ panel: get().panel === panel ? "none" : panel }),
	toggleMuted: () => {
		const muted = !get().muted;
		set({ muted });
		setMuted(muted);
		get().persist();
	},
	dismissAway: () => set({ awayCash: 0 }),
	wipe: () => {
		clearSave();
		set({
			...defaultSave(),
			playing: false,
			hasSave: false,
			awayCash: 0,
			panel: "none",
			combo: 0,
			events: []
		});
	},
	persist: () => {
		writeSave(toSave(get()));
	}
}));
function hydrateMenu() {
	const loaded = loadSave();
	useGame.setState({
		...loaded,
		hydrated: true,
		hasSave: hasProgress(loaded),
		playing: false
	});
}
function iso(col, row) {
	return {
		x: (col - row) * 46,
		y: (col + row) * 23
	};
}
function screenToIso(x, y) {
	return {
		col: (x / 46 + y / 23) / 2,
		row: (y / 23 - x / 46) / 2
	};
}
function diamond(ctx, x, y, w = 92, h = 46) {
	ctx.beginPath();
	ctx.moveTo(x, y - h / 2);
	ctx.lineTo(x + w / 2, y);
	ctx.lineTo(x, y + h / 2);
	ctx.lineTo(x - w / 2, y);
	ctx.closePath();
}
function inDiamond(px, py, x, y, w = 92, h = 46) {
	return Math.abs(px - x) / (w / 2) + Math.abs(py - y) / (h / 2) <= 1.05;
}
function loadImage(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => resolve(null);
		img.src = src;
	});
}
async function loadSprites() {
	const [city, plant, ...rest] = await Promise.all([
		loadImage("/sprites/city.jpg"),
		loadImage("/sprites/plant.png"),
		...Array.from({ length: 9 }, (_, i) => loadImage(`/sprites/furn-${i}.png`)),
		...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/worker-a-${i}.png`)),
		...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/worker-b-${i}.png`)),
		...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/cash-${i}.png`))
	]);
	return {
		city,
		plant,
		furn: rest.slice(0, 9),
		workerA: rest.slice(9, 13),
		workerB: rest.slice(13, 17),
		cash: rest.slice(17, 21),
		ready: true
	};
}
var emptyBank = {
	city: null,
	plant: null,
	furn: Array.from({ length: 9 }, () => null),
	workerA: Array.from({ length: 4 }, () => null),
	workerB: Array.from({ length: 4 }, () => null),
	cash: Array.from({ length: 4 }, () => null),
	ready: false
};
function OfficeCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		let bank = emptyBank;
		loadSprites().then((b) => {
			bank = b;
		});
		const particles = [];
		const floats = [];
		const pops = /* @__PURE__ */ new Map();
		let lastOwned = "";
		let panX = 0;
		let panY = 0;
		let dragging = false;
		let dragMoved = false;
		let lastPtr = {
			x: 0,
			y: 0
		};
		let startPtr = {
			x: 0,
			y: 0
		};
		let last = performance.now();
		let acc = 0;
		let raf = 0;
		let cam = {
			ox: 0,
			oy: 0,
			scale: 1
		};
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		function resize() {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = wrap.clientWidth;
			const h = wrap.clientHeight;
			canvas.width = Math.max(1, Math.floor(w * dpr));
			canvas.height = Math.max(1, Math.floor(h * dpr));
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
		}
		function worldTransform() {
			const w = canvas.width;
			const h = canvas.height;
			const scale = Math.min(w / 816, h / 548) * .92;
			const origin = iso(4, 3);
			return {
				scale,
				ox: w / 2 - origin.x * scale + panX,
				oy: h * .38 - origin.y * scale + panY
			};
		}
		function toWorld(clientX, clientY) {
			const rect = canvas.getBoundingClientRect();
			const dpr = canvas.width / rect.width;
			const sx = (clientX - rect.left) * dpr;
			const sy = (clientY - rect.top) * dpr;
			const { ox, oy, scale } = cam;
			return {
				x: (sx - ox) / scale,
				y: (sy - oy) / scale,
				sx,
				sy
			};
		}
		function spawnSparks(x, y, n, kind = "spark") {
			if (reduced) return;
			for (let i = 0; i < n; i++) particles.push({
				x,
				y,
				vx: (Math.random() - .5) * 70,
				vy: -20 - Math.random() * 50,
				life: .4 + Math.random() * .5,
				max: .9,
				kind
			});
		}
		function hitStation(wx, wy) {
			for (let i = STATIONS.length - 1; i >= 0; i--) {
				const s = STATIONS[i];
				const p = iso(s.col, s.row);
				if (inDiamond(wx, wy, p.x, p.y - 8, 105.8, 46 * 1.6)) return s;
			}
			const g = screenToIso(wx, wy);
			const col = Math.round(g.col);
			const row = Math.round(g.row);
			return STATIONS.find((s) => s.col === col && s.row === row);
		}
		function onDown(ev) {
			dragging = true;
			dragMoved = false;
			lastPtr = {
				x: ev.clientX,
				y: ev.clientY
			};
			startPtr = {
				x: ev.clientX,
				y: ev.clientY
			};
			canvas.setPointerCapture(ev.pointerId);
		}
		function onMove(ev) {
			if (!dragging) return;
			const dx = ev.clientX - lastPtr.x;
			const dy = ev.clientY - lastPtr.y;
			if (Math.hypot(ev.clientX - startPtr.x, ev.clientY - startPtr.y) > 10) dragMoved = true;
			lastPtr = {
				x: ev.clientX,
				y: ev.clientY
			};
			if (dragMoved) {
				const dpr = canvas.width / canvas.getBoundingClientRect().width;
				panX += dx * dpr;
				panY += dy * dpr;
			}
		}
		function onUp(ev) {
			dragging = false;
			if (dragMoved) return;
			const w = toWorld(ev.clientX, ev.clientY);
			const st = hitStation(w.x, w.y);
			const game = useGame.getState();
			if (st) {
				const before = Object.values(game.owned).join(",");
				const gain = game.clickStation(st.id);
				const p = iso(st.col, st.row);
				if (gain > 0) {
					floats.push({
						x: p.x,
						y: p.y - 36,
						text: `+${formatMoney(gain)}`,
						life: .9
					});
					spawnSparks(p.x, p.y - 10, 7, "coin");
				} else if (useGame.getState().owned[st.id] !== game.owned[st.id] || before !== Object.values(useGame.getState().owned).join(",")) {
					pops.set(st.id, 1);
					spawnSparks(p.x, p.y, 14);
				}
				return;
			}
			const all = game.collectAll();
			if (all > 0) floats.push({
				x: w.x,
				y: w.y,
				text: `+${formatMoney(all)}`,
				life: .9
			});
		}
		function drawHelipad(ctx, x, y, t) {
			ctx.save();
			diamond(ctx, x, y, 92 * 1.6, 46 * 1.6);
			ctx.fillStyle = "#2a2d34";
			ctx.fill();
			ctx.strokeStyle = "rgba(143,163,184,0.7)";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.beginPath();
			ctx.ellipse(x, y, 22, 11, 0, 0, Math.PI * 2);
			ctx.strokeStyle = `rgba(242,239,230,${.55 + Math.sin(t * 3) * .2})`;
			ctx.stroke();
			ctx.font = "700 14px Outfit, sans-serif";
			ctx.fillStyle = "#f2efe6";
			ctx.textAlign = "center";
			ctx.fillText("H", x, y + 5);
			ctx.restore();
		}
		function drawSprite(ctx, img, x, y, height) {
			if (!img || !img.complete || img.naturalWidth === 0) return false;
			const w = img.width * (height / img.height);
			ctx.drawImage(img, x - w / 2, y - height, w, height);
			return true;
		}
		function frame(now) {
			const dt = Math.min(.1, (now - last) / 1e3);
			last = now;
			acc += dt;
			const step = 1 / 20;
			while (acc >= step) {
				useGame.getState().tick(step);
				acc -= step;
			}
			const state = useGame.getState();
			const ownedKey = Object.entries(state.owned).filter(([, v]) => v > 0).map(([k]) => k).join(",");
			if (ownedKey !== lastOwned) lastOwned = ownedKey;
			cam = worldTransform();
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				raf = requestAnimationFrame(frame);
				return;
			}
			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect(0, 0, w, h);
			const sky = ctx.createLinearGradient(0, 0, 0, h);
			sky.addColorStop(0, "#151822");
			sky.addColorStop(.45, "#101218");
			sky.addColorStop(1, "#0c0d10");
			ctx.fillStyle = sky;
			ctx.fillRect(0, 0, w, h);
			if (bank.city) {
				ctx.save();
				ctx.globalAlpha = .55;
				const iw = w;
				const ih = iw * (bank.city.height / bank.city.width);
				ctx.drawImage(bank.city, 0, 0, iw, ih);
				ctx.restore();
				const fade = ctx.createLinearGradient(0, ih * .4, 0, ih);
				fade.addColorStop(0, "rgba(12,13,16,0)");
				fade.addColorStop(1, "#0c0d10");
				ctx.fillStyle = fade;
				ctx.fillRect(0, 0, w, h);
			}
			const trauma = reduced ? 0 : state.shake * state.shake;
			const shakeX = trauma ? (Math.random() - .5) * 14 * trauma : 0;
			const shakeY = trauma ? (Math.random() - .5) * 10 * trauma : 0;
			ctx.save();
			ctx.translate(cam.ox + shakeX, cam.oy + shakeY);
			ctx.scale(cam.scale, cam.scale);
			for (let c = -1; c < 10; c++) {
				const p = iso(c, -.7);
				ctx.fillStyle = "rgba(18,22,30,0.85)";
				ctx.beginPath();
				ctx.moveTo(p.x - 46, p.y);
				ctx.lineTo(p.x, p.y - 90);
				ctx.lineTo(p.x + 46, p.y);
				ctx.lineTo(p.x, p.y + 23);
				ctx.closePath();
				ctx.fill();
				ctx.strokeStyle = "rgba(143,163,184,0.18)";
				ctx.stroke();
			}
			for (let row = 0; row < 7; row++) for (let col = 0; col < 9; col++) {
				const p = iso(col, row);
				diamond(ctx, p.x, p.y);
				ctx.fillStyle = (col + row) % 2 === 0 ? "#1b1e26" : "#15171e";
				ctx.fill();
				ctx.strokeStyle = "rgba(242,239,230,0.04)";
				ctx.lineWidth = 1;
				ctx.stroke();
			}
			for (let col = 0; col < 9; col++) {
				const p = iso(col, 6.5);
				diamond(ctx, p.x, p.y + 10, 92, 18);
				ctx.fillStyle = "#2a231c";
				ctx.fill();
			}
			const nxt = nextStation(state.owned);
			const t = state.time;
			globalMult(state);
			const frameI = Math.floor(t * 4) % 4;
			const items = [];
			if (STATIONS.filter((s) => (state.owned[s.id] ?? 0) > 0).length >= 3) for (const sp of [
				{
					c: 0,
					r: 0
				},
				{
					c: 8,
					r: 0
				},
				{
					c: 0,
					r: 6
				}
			]) {
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
						drawSprite(ctx, bank.plant, p.x, p.y + 10, 78);
					}
				});
			}
			for (const st of STATIONS) {
				const p = iso(st.col, st.row);
				const lvl = state.owned[st.id] ?? 0;
				const pop = pops.get(st.id) ?? 0;
				if (pop > 0) pops.set(st.id, Math.max(0, pop - dt * 2.6));
				const popScale = 1 + (reduced ? 0 : Math.sin(Math.min(1, pop) * Math.PI) * .12);
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
							const pulse = isNext ? .55 + Math.sin(t * 4) * .25 : .18;
							diamond(ctx, p.x, p.y, 84.64, 42.32);
							ctx.fillStyle = can ? `rgba(143,163,184,${.28 + pulse * .35})` : isNext ? `rgba(196,165,116,${.16 + pulse * .2})` : "rgba(242,239,230,0.04)";
							ctx.fill();
							if (isNext) {
								ctx.strokeStyle = can ? "rgba(143,163,184,0.9)" : "rgba(196,165,116,0.7)";
								ctx.lineWidth = 2;
								ctx.stroke();
								ctx.font = "600 11px Outfit, sans-serif";
								ctx.textAlign = "center";
								ctx.fillStyle = "#f2efe6";
								ctx.fillText(st.name, p.x, p.y - 22);
								ctx.fillStyle = can ? "#9eb8a6" : "#c4a574";
								ctx.font = "600 12px IBM Plex Mono, monospace";
								ctx.fillText(st.cost === 0 ? "FREE" : formatMoney(st.cost), p.x, p.y + 4);
							}
						} else {
							ctx.fillStyle = "rgba(0,0,0,0.32)";
							ctx.beginPath();
							ctx.ellipse(p.x, p.y + 8, 28 * st.scale, 12, 0, 0, Math.PI * 2);
							ctx.fill();
							if (st.furn < 0) drawHelipad(ctx, p.x, p.y, t);
							else {
								const img = bank.furn[st.furn] ?? null;
								if (!drawSprite(ctx, img, p.x, p.y + 12, 86 * st.scale)) {
									diamond(ctx, p.x, p.y, 92 * .8, 46 * .8);
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
							if (st.id === "coffee" && !reduced) spawnSparks(p.x + 8, p.y - 40, t % .4 < dt ? 1 : 0, "steam");
							ctx.font = "600 10px Outfit, sans-serif";
							ctx.textAlign = "center";
							ctx.fillStyle = "rgba(242,239,230,0.55)";
							ctx.fillText(`Lv ${lvl}`, p.x, p.y + 22);
						}
						ctx.restore();
					}
				});
			}
			items.sort((a, b) => a.depth - b.depth);
			for (const it of items) it.draw();
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.life -= dt;
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				p.vy += (p.kind === "steam" ? -20 : 80) * dt;
				if (p.life <= 0) {
					particles.splice(i, 1);
					continue;
				}
				ctx.globalAlpha = p.life / p.max;
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
				const f = floats[i];
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
			if (state.auto && !reduced && Math.random() < dt * 3) {
				const owned = STATIONS.filter((s) => (state.owned[s.id] ?? 0) > 0);
				const st = owned[Math.floor(Math.random() * owned.length)];
				if (st) {
					const p = iso(st.col, st.row);
					spawnSparks(p.x, p.y - 20, 2, "coin");
				}
			}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		className: "relative h-full min-h-0 w-full overflow-hidden bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "block h-full w-full touch-none",
			"aria-label": "Hustle HQ office floor"
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function snap(s) {
	return {
		cash: s.cash,
		lifetime: s.lifetime,
		prestige: s.prestige,
		owned: s.owned,
		wifi: s.wifi,
		clickLvl: s.clickLvl,
		hr: s.hr,
		boostUntil: s.boostUntil,
		time: s.time,
		combo: s.combo
	};
}
function Chip({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center gap-2 rounded-xl border border-line bg-surface/90 px-3 py-2 text-sm shadow-soft backdrop-blur-sm", className),
		children
	});
}
function Hud() {
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
	const time = useGame((s) => s.time);
	const playing = useGame((s) => s.playing);
	const ips = totalIncome({
		cash,
		lifetime: 0,
		prestige,
		owned,
		wifi,
		clickLvl,
		hr,
		boostUntil,
		time,
		combo
	});
	const activeBoosts = BOOSTS.filter((b) => (boostUntil[b.id] ?? 0) > time);
	if (!playing) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium tracking-tight text-fg sm:text-2xl",
					children: "Hustle HQ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					className: "mt-2 rounded-2xl px-4 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted",
							children: "Cash"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xl font-medium tabular-nums text-fg sm:text-3xl",
							children: formatMoney(cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs tabular-nums text-sage",
							children: formatRate(ips)
						})
					] })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-end gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: muted ? "Unmute" : "Mute",
							onClick: () => useGame.getState().toggleMuted(),
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
							label: "Settings",
							onClick: () => useGame.getState().setPanel("settings"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
						})]
					}),
					prestige > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums",
						children: ["×", prestigeMult(prestige)]
					})] }),
					combo > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointer2, { className: "size-3.5 text-sage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs tabular-nums",
						children: [
							"x",
							combo,
							" combo"
						]
					})] }),
					auto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: "Manager on"
					})] })
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto space-y-3",
			children: [activeBoosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: activeBoosts.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-line bg-raised px-3 py-1 text-xs text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3 text-accent" }),
						b.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums text-muted",
							children: formatTime((boostUntil[b.id] ?? 0) - time)
						})
					]
				}, b.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: panel === "shop",
						onClick: () => useGame.getState().setPanel("shop"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" }),
						label: "Shop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: panel === "boosts",
						onClick: () => useGame.getState().setPanel("boosts"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" }),
						label: "Boosts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: panel === "ipo",
						onClick: () => useGame.getState().setPanel("ipo"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-4" }),
						label: "IPO"
					})
				]
			})]
		})]
	}), panel !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidePanel, {})] });
}
function IconBtn({ children, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: "grid size-11 place-items-center rounded-xl border border-line bg-surface text-fg transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-raised active:scale-[0.98]",
		children
	});
}
function NavBtn({ active, onClick, icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors duration-150", active ? "border-line-strong bg-fg text-accent-fg" : "border-line bg-surface text-fg hover:bg-raised"),
		children: [icon, label]
	});
}
function SidePanel() {
	const panel = useGame((s) => s.panel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-end sm:p-5 sm:pt-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close panel",
			className: "absolute inset-0 bg-[color-mix(in_oklab,var(--color-bg)_55%,transparent)]",
			onClick: () => useGame.setState({ panel: "none" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex max-h-[78dvh] w-full flex-col rounded-t-2xl border border-line bg-surface shadow-soft sm:max-h-[85dvh] sm:w-[min(100%,24rem)] sm:rounded-2xl",
			role: "dialog",
			"aria-label": panel,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium tracking-tight",
					children: panel === "shop" ? "Build" : panel === "boosts" ? "Boosts" : panel === "ipo" ? "File the IPO" : "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close",
					className: "grid size-10 place-items-center rounded-lg text-muted hover:text-fg",
					onClick: () => useGame.setState({ panel: "none" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-4 py-4",
				children: [
					panel === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopBody, {}),
					panel === "boosts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoostBody, {}),
					panel === "ipo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpoBody, {}),
					panel === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsBody, {})
				]
			})]
		})]
	});
}
function ShopBody() {
	const s = useGame();
	const nxt = nextStation(s.owned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			nxt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
				children: "Next desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationRow, {
				def: nxt,
				level: 0,
				highlight: true,
				cash: s.cash
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
				children: "Floor"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: STATIONS.filter((st) => (s.owned[st.id] ?? 0) > 0).map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationRow, {
					def: st,
					level: s.owned[st.id] ?? 0,
					cash: s.cash
				}) }, st.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
				children: "Upgrades"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: UPGRADES.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeRow, { def: u }) }, u.id))
			})] })
		]
	});
}
function StationRow({ def, level, highlight, cash }) {
	const owned = level > 0;
	const cost = owned ? upgradeCost(def, level) : def.cost;
	const can = owned ? canUpgrade(level) && cash >= cost : cash >= def.cost;
	const rate = stationRate(def, Math.max(1, level), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border p-3", highlight ? "border-line-strong bg-raised" : "border-line bg-bg/40"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: def.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs leading-snug text-muted",
						children: def.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs tabular-nums text-sage",
						children: [formatRate(rate), level > 0 ? ` · Lv ${level}` : ""]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: owned ? !canUpgrade(level) || !can : !can,
				onClick: () => owned ? useGame.getState().upgradeStation(def.id) : useGame.getState().buyStation(def.id),
				className: cn("h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums transition-transform duration-150 active:scale-[0.98]", can ? "bg-fg text-accent-fg" : "border border-line bg-raised text-muted"),
				children: owned ? canUpgrade(level) ? formatMoney(cost) : "MAX" : formatMoney(cost)
			})]
		})
	});
}
function UpgradeRow({ def }) {
	const s = useGame();
	const level = def.id === "wifi" ? s.wifi : def.id === "click" ? s.clickLvl : def.id === "hr" ? s.hr : def.id === "auto" ? s.auto ? 1 : 0 : s.offline ? 1 : 0;
	const maxed = level >= def.max;
	const cost = def.cost(level);
	const can = !maxed && s.cash >= cost;
	const Icon = def.id === "wifi" ? Wifi : def.id === "click" ? MousePointer2 : def.id === "auto" ? Users : def.id === "hr" ? Briefcase : Gauge;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-xl border border-line bg-bg/40 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-10 place-items-center rounded-lg bg-raised text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: def.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: def.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 font-mono text-xs tabular-nums text-subtle",
						children: maxed ? "Owned" : `Tier ${level}/${def.max}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: maxed || !can,
				onClick: () => useGame.getState().buyUpgrade(def.id),
				className: cn("h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums", maxed ? "text-muted" : can ? "bg-fg text-accent-fg" : "border border-line text-muted"),
				children: maxed ? "—" : formatMoney(cost)
			})
		]
	});
}
function BoostBody() {
	const ips = totalIncome(snap(useGame()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: BOOSTS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoostRow, {
			def: b,
			ips
		}) }, b.id))
	});
}
function BoostRow({ def, ips }) {
	const s = useGame();
	const cost = boostCost(def, ips);
	const cd = (s.boostCd[def.id] ?? 0) - s.time;
	const active = (s.boostUntil[def.id] ?? 0) - s.time;
	const cooling = cd > 0;
	const can = !cooling && s.cash >= cost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-line bg-bg/40 p-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-medium",
					children: [def.id === "coffee" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "size-3.5 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-accent" }), def.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: def.blurb
				}),
				active > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs tabular-nums text-sage",
					children: ["Live ", formatTime(active)]
				}),
				cooling && active <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs tabular-nums text-subtle",
					children: ["Cooldown ", formatTime(cd)]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !can,
				onClick: () => useGame.getState().activateBoost(def.id),
				className: cn("h-11 shrink-0 rounded-lg px-3 font-mono text-xs font-medium tabular-nums", can ? "bg-fg text-accent-fg" : "border border-line text-muted"),
				children: formatMoney(cost)
			})]
		})
	});
}
function IpoBody() {
	const s = useGame();
	const economy = snap(s);
	const ready = canIpo(economy);
	const have = ownedCount(s.owned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "File the S-1. The floor resets. Reputation stays. Each IPO doubles every desk on the next run."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Current multiplier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-mono tabular-nums",
							children: ["×", prestigeMult(s.prestige)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "After filing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-mono tabular-nums",
							children: ["×", prestigeMult(s.prestige + 1)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Desks owned"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-mono tabular-nums",
							children: [
								have,
								"/",
								8
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-bg/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Staff on payroll"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-mono tabular-nums",
							children: staffCount(s.owned)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: ipoRequirementLabel(economy)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: !ready,
				onClick: () => useGame.getState().ipo(),
				className: cn("flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium", ready ? "bg-fg text-accent-fg" : "border border-line text-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-4" }), "File IPO"]
			})
		]
	});
}
function SettingsBody() {
	const muted = useGame((s) => s.muted);
	const click = clickPower(snap(useGame.getState()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Progress saves on this device. Filing an IPO is the prestige reset."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => useGame.getState().toggleMuted(),
				className: "flex h-12 w-full items-center justify-between rounded-xl border border-line px-4 text-sm",
				children: ["Sound", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: muted ? "Off" : "On"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs tabular-nums text-subtle",
				children: ["Click power ", formatMoney(click)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => useGame.getState().wipe(),
				className: "flex h-12 w-full items-center justify-center rounded-xl border border-line text-sm text-danger",
				children: "Reset floor"
			})
		]
	});
}
function Game() {
	const playing = useGame((s) => s.playing);
	const hydrated = useGame((s) => s.hydrated);
	const hasSave = useGame((s) => s.hasSave);
	const awayCash = useGame((s) => s.awayCash);
	(0, import_react.useEffect)(() => {
		hydrateMenu();
		setMuted(useGame.getState().muted);
		return resumeAudioOnVisible();
	}, []);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficeCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}),
			!playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartOverlay, {
				hydrated,
				hasSave
			}),
			playing && awayCash > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwayModal, { amount: awayCash })
		]
	});
}
function StartOverlay({ hydrated, hasSave }) {
	const prestige = useGame((s) => s.prestige);
	const cash = useGame((s) => s.cash);
	function begin(fresh) {
		unlockAudio();
		useGame.getState().start(fresh);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-30 flex items-end sm:items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-cover bg-center",
				style: { backgroundImage: "url(/sprites/city.jpg)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(12,13,16,0.35)_0%,rgba(12,13,16,0.82)_52%,#0c0d10_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 w-full px-6 pb-10 pt-24 sm:mx-auto sm:max-w-lg sm:pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.22em] text-accent",
						children: "Night shift tycoon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl font-medium tracking-tight text-fg sm:text-6xl",
						children: "Hustle HQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-base leading-relaxed text-muted",
						children: "Buy the glowing pads. Desks print cash. Hire the floor, pop a boost, and file an IPO when the numbers get indecent."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-1.5 text-sm text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tap a pad to buy or collect." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Drag to pan the floor." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Boosts and the manager keep the lights on." })
						]
					}),
					hydrated && hasSave && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 font-mono text-xs tabular-nums text-sage",
						children: [
							"Saved ",
							formatMoney(cash),
							prestige > 0 ? ` · ×${prestigeMult(prestige)}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [hydrated && hasSave && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => begin(false),
							className: "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-fg text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Continue"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => begin(true),
							className: hydrated && hasSave ? "flex h-12 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium text-fg" : "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-fg text-sm font-medium text-accent-fg transition-transform duration-150 active:scale-[0.98]",
							children: hydrated && hasSave ? "New floor" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Open the floor"] })
						})]
					})
				]
			})
		]
	});
}
function AwayModal({ amount }) {
	const [open, setOpen] = (0, import_react.useState)(true);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-40 grid place-items-center bg-[color-mix(in_oklab,var(--color-bg)_55%,transparent)] p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-5 text-accent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl font-medium tracking-tight",
					children: "While you were out"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "The night crew kept a few invoices moving."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-mono text-3xl tabular-nums text-fg",
					children: formatMoney(amount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-fg text-sm font-medium text-accent-fg",
					onClick: () => {
						setOpen(false);
						useGame.getState().dismissAway();
					},
					children: "Collect"
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Game, {});
}
//#endregion
export { Home as component };
