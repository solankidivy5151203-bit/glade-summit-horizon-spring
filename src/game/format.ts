const SUFFIXES = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

export function formatMoney(n: number, digits?: number): string {
  if (!Number.isFinite(n)) return "$0";
  if (n < 0) return `-${formatMoney(-n, digits)}`;
  if (n < 1000) {
    if (n < 10) return `$${n.toFixed(1)}`;
    return `$${Math.floor(n)}`;
  }
  let e = Math.floor(Math.log10(n) / 3);
  if (e >= SUFFIXES.length) e = SUFFIXES.length - 1;
  const v = n / 1000 ** e;
  const d = digits ?? (v >= 100 ? 0 : v >= 10 ? 1 : 2);
  return `$${v.toFixed(d)}${SUFFIXES[e]}`;
}

export function formatRate(n: number): string {
  return `${formatMoney(n)}/s`;
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}:${r.toString().padStart(2, "0")}` : `0:${r.toString().padStart(2, "0")}`;
}
