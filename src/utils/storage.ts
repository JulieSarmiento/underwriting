"use client"
import { RequestLoanRecord } from "@/utils/types";

const LOAN_RECORDS_KEY = "loan-records:history:v1";
const MAX_RECORDS = 20;

function readRecords(): RequestLoanRecord[] {
    try{
        const record = typeof localStorage !== "undefined" ? localStorage.getItem(LOAN_RECORDS_KEY) : null;

        return record ? JSON.parse(record) : [];
    } catch (err) {
        console.error("Error reading loan records:", err);
        return [];
    }
}

function writeRecords(records: RequestLoanRecord[]) {
    try{
        localStorage.setItem(LOAN_RECORDS_KEY, JSON.stringify(records));
    } catch (err) {
        console.error("Error writing loan records:", err);
    }
}

// saves the record when the form is submitted
export function saveRecord(record: RequestLoanRecord) {
    const records = readRecords();
    records.unshift(record);
    writeRecords(records);
}

// returns all the records for history page
export function getAllRecords(): RequestLoanRecord[] {
    return readRecords();
  }

// this is mainly for the decision page
export function getRecord(id: string): RequestLoanRecord | null {
return readRecords().find(r => r.id === id) ?? null;
}