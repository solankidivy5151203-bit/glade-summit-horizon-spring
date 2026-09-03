import { GRID_H, GRID_W } from "./catalog";

export const TILE_W = 92;
export const TILE_H = 46;

export function iso(col: number, row: number) {
  return {
    x: (col - row) * (TILE_W / 2),
    y: (col + row) * (TILE_H / 2),
  };
}

export function screenToIso(x: number, y: number) {
  const col = (x / (TILE_W / 2) + y / (TILE_H / 2)) / 2;
  const row = (y / (TILE_H / 2) - x / (TILE_W / 2)) / 2;
  return { col, row };
}

export function gridCenter() {
  return iso((GRID_W - 1) / 2, (GRID_H - 1) / 2);
}

export function diamond(ctx: CanvasRenderingContext2D, x: number, y: number, w = TILE_W, h = TILE_H) {
  ctx.beginPath();
  ctx.moveTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y + h / 2);
  ctx.lineTo(x - w / 2, y);
  ctx.closePath();
}

export function inDiamond(px: number, py: number, x: number, y: number, w = TILE_W, h = TILE_H) {
  const dx = Math.abs(px - x) / (w / 2);
  const dy = Math.abs(py - y) / (h / 2);
  return dx + dy <= 1.05;
}
