/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

/** RGB samples from the Plasma colour map, interpolated per seed. */
const plasma = [
  [13, 8, 135],
  [70, 3, 159],
  [114, 1, 168],
  [156, 23, 158],
  [192, 58, 131],
  [225, 100, 98],
  [248, 148, 65],
  [253, 195, 40],
  [240, 249, 33],
] as const;

type Rgb = readonly [number, number, number];

const seededHash = (seed: string): number => {
  // FNV-1a
  let hash = 0x811c9dc5;

  for (let index = 0; index < seed.length; index++) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0;
};

const seededRgb = (seed: string): Rgb => {
  const position = (seededHash(seed) / 0xffffffff) * (plasma.length - 1);
  const index = Math.min(Math.floor(position), plasma.length - 2);
  const amount = position - index;
  const start = plasma[index];
  const end = plasma[index + 1];
  const interpolate = (channel: number) => Math.round(start[channel] + (end[channel] - start[channel]) * amount);

  return [interpolate(0), interpolate(1), interpolate(2)];
};

/** A stable Plasma colour for `seed`. */
export const seededColor = (seed: string): string => {
  const [red, green, blue] = seededRgb(seed);

  return `rgb(${red}, ${green}, ${blue})`;
};
