"use client"

import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import Header from "@/components/Header/Header";
import FinalDecisionSection from "@/components/FinalDecision/FinalDecision";
import { getRecord } from "@/utils/storage";
import { useState, useEffect } from "react";
import { RequestLoanRecord } from "@/utils/types";

export default function DecisionPage() {
    const { rid } = useParams<{ rid: string }>();
    
    
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState<RequestLoanRecord | null>(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    // 2) Only after mount (client) read from localStorage
    useEffect(() => {
        if (!loading && rid) {
        setRecord(getRecord(rid) ?? null);
        }
    }, [loading, rid]);
        
    return (
        <>  
            <Navigation />
            {!loading && record ? (
            <>
                <Header 
                    title="Cause we care" 
                    description="We care about your financial well-being, and we want to give a full feedback about your request." 
                />
                <FinalDecisionSection record={record} />
            </>
            ) : (
                <p className="text-sm text-gray-600">{loading ? "Loading..." : "No record found."}</p>
            )}
        </>
    )
}