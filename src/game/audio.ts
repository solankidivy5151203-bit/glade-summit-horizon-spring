type Bus = {
  ctx: AudioContext;
  master: GainNode;
  sfx: GainNode;
};

let bus: Bus | null = null;
let muted = false;

function getBus(): Bus | null {
  if (typeof window === "undefined") return null;
  if (bus) return bus;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC({ latencyHint: "interactive" });
  const master = ctx.createGain();
  const sfx = ctx.createGain();
  sfx.gain.value = 0.7;
  master.gain.value = muted ? 0 : 0.85;
  sfx.connect(master);
  master.connect(ctx.destination);
  bus = { ctx, master, sfx };
  return bus;
}

export function unlockAudio() {
  const b = getBus();
  if (!b) return;
  if (b.ctx.state === "suspended") void b.ctx.resume();
}

export function setMuted(next: boolean) {
  muted = next;
  const b = bus;
  if (!b) return;
  b.master.gain.setTargetAtTime(next ? 0 : 0.85, b.ctx.currentTime, 0.03);
}

function env(gain: GainNode, ctx: AudioContext, peak: number, attack: number, release: number) {
  const t = ctx.currentTime;
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType,
  peak: number,
  slide = 0,
) {
  const b = getBus();
  if (!b || muted) return;
  const osc = b.ctx.createOscillator();
  const g = b.ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, b.ctx.currentTime);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), b.ctx.currentTime + dur);
  env(g, b.ctx, peak, 0.01, dur);
  osc.connect(g);
  g.connect(b.sfx);
  osc.start();
  osc.stop(b.ctx.currentTime + dur + 0.05);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}

function noise(dur: number, peak: number, hp = 800) {
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
  env(g, b.ctx, peak, 0.005, dur * 0.9);
  src.connect(filter);
  filter.connect(g);
  g.connect(b.sfx);
  src.start();
  src.stop(b.ctx.currentTime + dur);
}

export const sfx = {
  click() {
    const jitter = 1 + (Math.random() * 0.16 - 0.08);
    tone(880 * jitter, 0.05, "triangle", 0.07);
  },
  collect() {
    const jitter = 1 + (Math.random() * 0.12 - 0.06);
    tone(1320 * jitter, 0.08, "sine", 0.09, 280);
    tone(1760 * jitter, 0.05, "triangle", 0.04);
  },
  buy() {
    tone(392, 0.12, "square", 0.06);
    tone(523, 0.16, "triangle", 0.08, 80);
    tone(784, 0.22, "sine", 0.05);
  },
  deny() {
    tone(140, 0.12, "sawtooth", 0.05, -40);
  },
  boost() {
    tone(262, 0.18, "sine", 0.07, 220);
    tone(392, 0.22, "triangle", 0.06, 180);
    noise(0.12, 0.04, 400);
  },
  ipo() {
    tone(523, 0.18, "triangle", 0.08);
    setTimeout(() => tone(659, 0.18, "triangle", 0.08), 90);
    setTimeout(() => tone(784, 0.28, "sine", 0.1), 180);
    setTimeout(() => tone(1046, 0.4, "sine", 0.07), 280);
  },
  upgrade() {
    tone(660, 0.1, "triangle", 0.07, 120);
    tone(990, 0.14, "sine", 0.05);
  },
  gift() {
    tone(523, 0.12, "sine", 0.08, 160);
    tone(784, 0.18, "triangle", 0.07, 220);
    tone(1046, 0.22, "sine", 0.05);
    noise(0.1, 0.03, 600);
  },
};

export function resumeAudioOnVisible() {
  if (typeof document === "undefined") return;
  const go = () => {
    if (document.visibilityState === "visible") unlockAudio();
  };
  document.addEventListener("visibilitychange", go);
  return () => document.removeEventListener("visibilitychange", go);
}
