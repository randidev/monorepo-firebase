import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";
import URLS from "./config/urls";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");

  if (!cookies.auth_token)
    return NextResponse.redirect(new URL(URLS.SIGNIN, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
