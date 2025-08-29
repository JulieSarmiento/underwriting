"use client"

import Navigation from "@/components/Navigation/Navigation";
import Header from "@/components/Header/Header";
import LoanForm from "@/components/LoanForm/LoanForm";

export default function ApplyPage() {
    return (
        <>
            <Navigation />
            <Header title="We appreciate your interest in " description="Please fill out the form below." />
            <LoanForm />
        </>
    )
}