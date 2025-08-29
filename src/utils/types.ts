import z from "zod";

// Creates a schema based on the input required in the loan form
export const FormSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    amount: z.coerce.number().gt(0, { message: "Amount must be > 0" }),
    occupancy: z.enum(["primary", "secondary", "investment"]),
    monthlyIncome: z.coerce.number().gt(0, { message: "Amount must be > 0" }),
    monthlyDebts: z.number().nonnegative("Debts cannot be negative"),
    propertyValue: z.number().positive(),
    fico: z.coerce.number().int().min(300).max(850)
});

// Adding this type to avoid types or validations to mismatch
export type FormInput = z.infer<typeof FormSchema>;

// From the API to the client, the final decision status
export type FinaDecision = "Approved" | "Refered" | "Declined";

// payload data to consume in the UI
export type FormPayload = {
    id: string;
    decision: FinaDecision;
    dti: number;
    ltv: number;
    reasons: string[]; 
}

// this is saved in localStorage to present in the history records
export type RequestLoanRecord = {
  id: string;
  name: string;
  amount: number;
  decision: FinaDecision;
  // extra info or values to show on the decision page
  dti: number;
  ltv: number | null;
  fico: number;
  reasons: string[];
};
