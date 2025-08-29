"use client"

import { type RequestLoanRecord } from "@/utils/types";
import styles from "@/components/FinalDecision/FinalDecision.module.scss";

// returns color classes to the decision badge
function decisionBadgeColor(decision: RequestLoanRecord['decision']) {
    switch (decision) {
        case "Approved":
            return "bg-green-800";
        case "Refered":
            return "bg-yellow-800";
        case "Declined":
            return "bg-red-800";
        default:
            return "bg-gray-800";
    }
}

export default function FinalDecisionSection({record }: {record: RequestLoanRecord}) {
    const isPending = record.decision === "Refered";
    
    return (
        <section className={styles["decision-section"]}>
            <h2 className={styles["decision-section--title"]}>Your loan request has been <strong className={styles['decision-badge'] + " " + decisionBadgeColor(record.decision)}>{record.decision}</strong></h2>
            <p className="">Based on the information provided, we determined:</p>
            <ul className={styles["decision-list"]}>
                <li className={styles["decision-list--item"]}>DTI: {record.dti.toFixed(2)}</li>
                <li className={styles["decision-list--item"]}>LTV: {record.ltv?.toFixed(2)}</li>
                <li className={styles["decision-list--item"]}>FICO: {record.fico}</li>
            </ul>
            <p>
                In interest of being transparent, here are the detailed reasons of our decision:
            </p>
            <ul className={styles["decision-reason-list"]}>
                {record.reasons.map((reason, index) => (
                    <li key={index} className={styles["decision-reason-list--item"]}>{reason}</li>
                ))}
            </ul>
            {isPending && (
                <p>
                This request will be studied in depth by our team. You’ll receive an update soon.
                </p>
            )}
            <p>Thank you for using our underwriting application system.</p>
        </section>
    )
}