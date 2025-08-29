import type { FormInput, FinaDecision, FormPayload } from "@/utils/types"

// Creating this variables to avoid repeating
const APPROVE = {
  DTI_MAX: 0.43,
  LTV_MAX: 0.80,
  FICO_MIN: 680,
} as const;

const REFER = {
  DTI_MAX: 0.50,
  LTV_MAX: 0.95,
  FICO_MIN: 660,
} as const;

/**
 * The values nedeed to get the reason for the user
 */
type LoanPercentajeOp = { dti: number; ltv: number | null; fico: number };

/**
 * when: is the condition
 * because: is the reason
 */
type ReasonExplanation = {
  when: (l: LoanPercentajeOp) => boolean;
  because: (l: LoanPercentajeOp) => string;
};
  
/**
 * Array of objects, evaluating each condition to return the correct reason
 */
const reasonsCase: ReasonExplanation[] = [
  {
    when: l => l.dti > APPROVE.DTI_MAX,
    because: l => "DTI too high",
  },
  {
    when: l => l.ltv !== null && l.ltv > APPROVE.LTV_MAX,
    because: l => "LTV too high",
  },
  {
    when: l => l.fico < APPROVE.FICO_MIN,
    because: l => "FICO too low",
  },
  {
    when: m => m.ltv === null, // no property value → no LTV
    because: () => "There are no properties, no LTV could be calculated",
  },
];

// Runs all cases and returns the reasons that fit
function setReasons(l: LoanPercentajeOp): string[] {
  const reasonsArr: string[] = [];
  for (const c of reasonsCase) if (c.when(l)) reasonsArr.push(c.because(l));
  return reasonsArr;
}

// Small function that calculates Debt to income ratio
export function calculateDTI(val: FormInput) {
  const { monthlyIncome, monthlyDebts } = val;

  return monthlyDebts / monthlyIncome;
}
// Calculates Load to value ratio, so far if there are no properties,
// there is no loan
export function calculateLTV(val: FormInput) {
  const { monthlyDebts, amount, propertyValue } = val;

  return propertyValue > 0 ? amount / propertyValue : null;
}

/**
 * Decision conditions:
 * Approved if DTI ≤ 0.43, LTV ≤ 0.80, and FICO score ≥ 680
 * Refered if DTI ≤ 0.50, LTV ≤ 0.95, and FICO score ≥ 660.
 * Otherwise Declined
 */
export function evaluateLoanRequest(loanReq: FormInput) {
    const dti = calculateDTI(loanReq);
    const ltv = calculateLTV(loanReq);
    const { fico } = loanReq;

    const reasons = setReasons({ dti, ltv, fico});

    let decision: FinaDecision;


    if (ltv !== null) {
      const approved = dti <= APPROVE.DTI_MAX && ltv <= APPROVE.LTV_MAX && fico >= APPROVE.FICO_MIN;
      const refered   = dti <= REFER.DTI_MAX   && ltv <= REFER.LTV_MAX   && fico >= REFER.FICO_MIN;
    
      if (approved) {
        decision = "Approved";
      } else if (refered) {
        decision = "Refered";
        // reasons for refering
        if (dti > APPROVE.DTI_MAX && dti <= REFER.DTI_MAX) reasons.push("DTI acceptable for Refer.");
        if (ltv > APPROVE.LTV_MAX && ltv <= REFER.LTV_MAX) reasons.push("LTV acceptable for Refer");
        if (fico >= REFER.FICO_MIN && fico < APPROVE.FICO_MIN) reasons.push("FICO acceptable for Refer");
      } else {
        decision = "Declined";
        if (reasons.length === 0) reasons.push("One or more criteria outside Refer range");
      }
    } else {
      decision = "Declined";
    }

    return {
      decision,
      dti,
      ltv,
      reasons,
    };    
}
