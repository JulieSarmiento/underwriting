import { useForm, type FieldPath, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, type FormInput, type FormPayload, type FinaDecision, type RequestLoanRecord } from "@/utils/types";
import { saveRecord } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import styles from "@/components/LoanForm/LoanForm.module.scss";


// Generates a random ID for each form submit
function uid() { return Math.random().toString(36).slice(2, 10); }

// reusable input wrapper
function FormInputWrapper({
    id, label, error, children,
  }: { 
    id: string; label: string; error?: string; children: React.ReactNode 
}) {
    return (
      <div className={styles["form-loan--field"]}>
        <label htmlFor={id} className={styles["form-loan--label"]}>{label}</label>
        {children}
        {error && <p id={`error-${id}`} className={styles["form-loan--field-error"]}>{error}</p>}
      </div>
    );
}

export default function LoanForm() {
    const router = useRouter();
    const formId = useId();
    const [submit, setSubmit] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState,
        getFieldState,
        clearErrors,
    } = useForm<FormInput>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
    });
    
    //helps setting all the attributes for input tags, and avoiding errors
    const setInput = <key extends FieldPath<FormInput>>(field: key) => {
        const id = `form-loan-${String(field)}-${formId}`;
        const { invalid, error } = getFieldState(field, formState);
        const isNumberField = [
            'amount',
            'monthlyIncome',
            'monthlyDebts',
            'propertyValue',
            'fico'
        ].includes(field as string);
    
        return {
          ...register(field, {
            onChange: () => {
                if (formState.errors[field]) {
                    clearErrors(field);
                }
            },
            valueAsNumber: isNumberField,
          }),
          id,
          className: styles["form-loan--input"],
          "aria-invalid": invalid ? true : false,
          "aria-describedby": error ? `${id}--error` : id,
        };
    };

    const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
        setSubmit(true);

        try {
            // sends the form filled to the backend
            const res = await fetch("/api/evaluate-loan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(!res.ok) {
                alert("Failed to evaluate loan request");
                return;
            }

            const payload = await res.json() as {
                decision: FinaDecision;
                dti: number;
                ltv: number | null;
                reasons: string[];
            };
            // sets the loan record to store it
            const record: RequestLoanRecord = {
                id: uid(),
                name: data.name,
                amount: data.amount,
                decision: payload.decision,
                dti: payload.dti,
                ltv: payload.ltv,
                fico: data.fico,
                reasons: payload.reasons,
            };
            
            // saves the record and redirects to the decision page for this request
            saveRecord(record);
            router.push(`/decision/${record.id}`);
        }  catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmit(false);
        }
    }

    // this is only for occupancy select
    const occupancyOpt = getFieldState("occupancy", formState);

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles["form-loan"]}>
            <FormInputWrapper id={`form-loan-name-${formId}`} label="Name" error={formState.errors.name?.message}>
                <input
                    {...setInput("name")}
                    type="text"
                    placeholder="Enter your name"
                />
            </FormInputWrapper>
            
            <FormInputWrapper id={`form-loan-amount-${formId}`} label="Loan amount" error={formState.errors.amount?.message}>
                <input
                    {...setInput("amount")}
                    type="number"
                    step="any"
                    placeholder="Enter needed amount"
                />
            </FormInputWrapper>

            <FormInputWrapper id={`form-loan-occupancy-${formId}`} label="Loan occupancy" error={formState.errors.occupancy?.message}>
                <select 
                    {...setInput("occupancy")}
                    id={`form-loan-occupancy-${formId}`} 
                    className={styles["form-loan--input"]} 
                    aria-invalid={occupancyOpt.invalid ? "true" : "false"}
                    aria-describedby={occupancyOpt.error ? `form-loan-occupancy-${formId}--error` : `form-loan-occupancy-${formId}`}
                    {...register("occupancy", { onChange: () => clearErrors("occupancy")})}
                >
                    <option value="">select occupancy</option>
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="investment">investment</option>
                </select>
            </FormInputWrapper>

            <FormInputWrapper id={`form-loan-monthlyIncome-${formId}`} label="Monthly income" error={formState.errors.monthlyIncome?.message}>
                <input
                    {...setInput("monthlyIncome")}
                    type="number"
                    step="any"
                    placeholder="Enter monthly income"
                />
            </FormInputWrapper>

            <FormInputWrapper id={`form-loan-monthlyDebts-${formId}`} label="Monthly debts" error={formState.errors.monthlyDebts?.message}>
                <input
                    {...setInput("monthlyDebts")}
                    type="number"
                    step="any"
                    placeholder="Enter monthly debts"
                />
            </FormInputWrapper>

            <FormInputWrapper id={`form-loan-propertyValue-${formId}`} label="Property value" error={formState.errors.propertyValue?.message}>
                <input
                    {...setInput("propertyValue")}
                    type="number"
                    step="any"
                    placeholder="Enter property value"
                />
            </FormInputWrapper>

            <FormInputWrapper id={`form-loan-fico-${formId}`} label="FICO score" error={formState.errors.fico?.message}>
                <input
                    {...setInput("fico")}
                    type="number"
                    step="any"
                    placeholder="Enter FICO score"
                />
            </FormInputWrapper>
            <button disabled={submit} className={styles["form-loan--submit"]}>
                {submit ? "Processing..." : "Submit"}
            </button>
        </form>
    )
}
    