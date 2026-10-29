/**
 * Copyright (c) Freelens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */

import { describe, expect, it } from "vitest";
import { seededColor } from "./seeded-color";

const parseRgb = (color: string) => {
  const match = /^rgb\((?<red>\d+), (?<green>\d+), (?<blue>\d+)\)$/.exec(color);

  if (!match?.groups) {
    throw new Error(`not an rgb() colour: ${color}`);
  }

  return [Number(match.groups.red), Number(match.groups.green), Number(match.groups.blue)];
};

describe("seededColor", () => {
  it("returns the same colour for the same seed", () => {
    expect(seededColor("some-cluster-local")).toBe(seededColor("some-cluster-local"));
  });

  it("returns different colours for different seeds", () => {
    expect(seededColor("some-cluster-local")).not.toBe(seededColor("other-cluster-local"));
  });

  it("handles an empty seed", () => {
    expect(parseRgb(seededColor(""))).toHaveLength(3);
  });

  it("spreads seeds across the Turbo gradient", () => {
    const colors = new Set(Array.from({ length: 500 }, (_, index) => seededColor(`cluster-${index}-local`)));

    expect(colors.size).toBeGreaterThan(200);
  });
});
