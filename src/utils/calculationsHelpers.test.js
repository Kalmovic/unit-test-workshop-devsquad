import { sum, subtract } from "./calculationsHelpers";

describe("sum", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(0, 0)).toBe(0);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("subtract", () => {
  it("should return the subtraction of two numbers", () => {
    expect(subtract(1, 2)).toBe(-1);
    expect(subtract(0, 0)).toBe(0);
    expect(subtract(-1, 1)).toBe(-2);
    expect(subtract(0.1, 0.2)).toBeCloseTo(-0.1);
  });
});
