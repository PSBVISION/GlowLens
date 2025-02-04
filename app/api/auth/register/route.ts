import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json();
    if(!email || !password){
      return NextResponse.json({
        
      })
    }
  } catch (error) {
    
  }
}