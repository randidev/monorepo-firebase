import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie = serialize("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  const response = NextResponse.json({ message: "Successfully signed out" });
  response.headers.append("Set-Cookie", cookie);

  return response;
}
