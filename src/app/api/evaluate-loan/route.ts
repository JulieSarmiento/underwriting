import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/utils/types";
import { evaluateLoanRequest } from "@/utils/decisionLogic";

/**
 * 
 * @param req 
 * @returns NextResponse with status
 */
export async function POST(req:NextRequest){
    try {
        const json = await req.json();

        // using Zod to validate through the schema created
        const formParsed = FormSchema.safeParse(json);

        //in case something happens when parsing the data
        if(!formParsed.success) {
            return NextResponse.json(
                {error: "Invalid input", issues: formParsed.error},
                {status: 400}
            )
        }

        const decisionPayload = evaluateLoanRequest(formParsed.data);

        return NextResponse.json(decisionPayload, {status: 200})
    } catch(err) {
        return NextResponse.json({ error: "Bad request"}, {status: 200})
    }
}
