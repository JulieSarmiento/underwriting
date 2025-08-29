"use client"

import Navigation from "@/components/Navigation/Navigation";
import Header from "@/components/Header/Header";
import HistoryList from "@/components/HistoryList/HistoryList";

export default function HistoryPage() {
    return (
        <>
            <Navigation />
            <Header 
                title="Loan applications history" 
                description="This are the logs of the loan applications so far." 
            />
            <HistoryList />
        </>
    )
}
