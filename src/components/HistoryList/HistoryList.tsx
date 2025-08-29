"use client"

import styles from "./HistoryList.module.scss";
import { useEffect, useState } from "react";
import { getAllRecords } from "@/utils/storage";
import { RequestLoanRecord } from "@/utils/types";

// Gives an easier text for user to understand
function referDecision (d: RequestLoanRecord["decision"]) {
    return d === "Refered" ? "Pending further review" : d;
}

function decisionBadgeColor(decision: RequestLoanRecord['decision']) {
    switch (decision) {
        case "Approved":
            return "bg-teal-700";
        case "Refered":
            return "bg-amber-700";
        case "Declined":
            return "bg-rose-700";
        default:
            return "bg-gray-800";
    }
}

export default function HistoryList() {
    const [listItems, setListItems] = useState<RequestLoanRecord[]>([]);

    useEffect(() => {
        setListItems(getAllRecords());
    }, []);

    return listItems.length === 0 ? (
            <p className="text-sm text-gray-600">No records yet.</p>
        ) : (
            <table className={styles['history-table']}>
                <thead>
                    <tr>
                        <th className={styles['history-table--header']}>Name</th>
                        <th className={styles['history-table--header']}>Amount</th>
                        <th className={styles['history-table--header']}>Decision</th>
                    </tr>
                </thead>
                <tbody>
                {listItems.map((item) => (
                    <tr key={item.id} className="rounded-lg border">
                        <td className={styles['history-table--cell']}>{item.name}</td>
                        <td className={styles['history-table--cell']}>${item.amount.toLocaleString()}</td>
                        <td className={styles['history-table--cell']}>
                            <span className={styles['history-table--badge'] + " " + decisionBadgeColor(item.decision)}>{referDecision(item.decision)}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
    