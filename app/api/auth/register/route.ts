import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const {email, password} = await request.json();
    if(!email || !password){
      return NextResponse.json(
        {error: "Email and password is required"},
        {status: 400}
      )
    }

    await ConnectToDatabase();

    const existingUser = await User.findOne({email});
    if(existingUser){
      return NextResponse.json(
        {error: "Email is already in use"},
        {status: 400}
      )
    }
    await User.create({email, password});
    return NextResponse.json(
      {message: "User registered successfully"},
      {status: 201}
    );
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to register user"+ error},
      {status: 500}
    );
  }
}