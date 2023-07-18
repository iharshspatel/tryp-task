import { NextResponse, NextRequest } from "next/server";
import { rowsData } from "@/constants/data";

export function GET(){
    return NextResponse.json({
        "message":"bookings recieved Successfully",
        "success":true,
        "rows":rowsData
    })
}