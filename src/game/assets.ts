export type SpriteBank = {
  city: HTMLImageElement | null;
  furn: (HTMLImageElement | null)[];
  workerA: (HTMLImageElement | null)[];
  workerB: (HTMLImageElement | null)[];
  cash: (HTMLImageElement | null)[];
  gift: (HTMLImageElement | null)[];
  cast: (HTMLImageElement | null)[];
  plant: HTMLImageElement | null;
  ready: boolean;
};

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function loadSprites(): Promise<SpriteBank> {
  const [city, plant, ...rest] = await Promise.all([
    loadImage("/sprites/city.jpg"),
    loadImage("/sprites/plant.png"),
    ...Array.from({ length: 9 }, (_, i) => loadImage(`/sprites/furn-${i}.png`)),
    ...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/worker-a-${i}.png`)),
    ...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/worker-b-${i}.png`)),
    ...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/cash-${i}.png`)),
    ...Array.from({ length: 4 }, (_, i) => loadImage(`/sprites/gift-${i}.png`)),
    ...Array.from({ length: 8 }, (_, i) => loadImage(`/sprites/cast-${i}.png`)),
  ]);
  const furn = rest.slice(0, 9);
  const workerA = rest.slice(9, 13);
  const workerB = rest.slice(13, 17);
  const cash = rest.slice(17, 21);
  const gift = rest.slice(21, 25);
  const cast = rest.slice(25, 33);
  return { city, plant, furn, workerA, workerB, cash, gift, cast, ready: true };
}

export const emptyBank: SpriteBank = {
  city: null,
  plant: null,
  furn: Array.from({ length: 9 }, () => null),
  workerA: Array.from({ length: 4 }, () => null),
  workerB: Array.from({ length: 4 }, () => null),
  cash: Array.from({ length: 4 }, () => null),
  gift: Array.from({ length: 4 }, () => null),
  cast: Array.from({ length: 8 }, () => null),
  ready: false,
};
