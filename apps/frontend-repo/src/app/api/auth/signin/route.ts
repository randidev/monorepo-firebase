import CONFIG from "@/config";
import { auth } from "@/lib/firebase";
import { serialize } from "cookie";
import { signInWithEmailAndPassword } from "firebase/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password)
    return NextResponse.json(
      { error: "Invalid body. No email or password sent." },
      { status: 400 }
    );

  try {
    const user = await signInWithEmailAndPassword(
      auth,
      body.email,
      body.password
    );

    const token = jwt.sign(
      {
        email: user.user.email,
        uid: user.user.uid,
      },
      CONFIG.SECRET
    );

    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const response = NextResponse.json({
      message: "Successfully signed in",
      token,
    });
    response.headers.append("Set-Cookie", cookie);

    return response;
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
