import { calculateDTI, calculateLTV } from "@/utils/decisionLogic";
import type { FormInput } from "@/utils/types";

// dummy Info to fill the form
function dummyInput(overrides: Partial<FormInput> = {}): FormInput {
  return {
    name: "Alex Doe",
    amount: 300000,
    monthlyIncome: 8000,
    monthlyDebts: 2000,
    propertyValue: 400000,
    fico: 700,
    occupancy: "primary",
    ...overrides,
  };
}


describe("calculateDTI", () => {
    it("computes debts / income", () => {
      const input = dummyInput({ monthlyIncome: 8000, monthlyDebts: 2000 });
      expect(calculateDTI(input)).toBeCloseTo(0.25, 5);
    });
});

describe("calculateLTV", () => {
    it("is amount / propertyValue when propertyValue > 0", () => {
        const input = dummyInput({ amount: 300000, propertyValue: 400000 });
        expect(calculateLTV(input)).toBeCloseTo(0.75, 5);
    });

    it("is null when propertyValue == 0", () => {
        const input = dummyInput({ propertyValue: 0 });
        expect(calculateLTV(input)).toBeNull();
    });
});