import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import api from "./utils/axios";

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(
      `${process.env.NODE_ENV === "production" ? process.env.API_URL_SERVER : "localhost:4001"}/auth/refresh`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/signin", "/register"];
  const protectedRoutes = ["/", "/categories"];

  // ============================================================
  // 1️⃣ USER ALREADY LOGGED IN → BLOCK AUTH ROUTES
  // ============================================================
  if (accessToken && refreshToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ============================================================
  // 2️⃣ NO TOKENS → REDIRECT TO SIGNIN
  // ============================================================
  if (!accessToken && !refreshToken) {
    if (protectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // ============================================================
  // 3️⃣ REFRESH TOKEN EXISTS BUT NO ACCESS TOKEN → REFRESH IT
  // ============================================================
  if (!accessToken && refreshToken) {
    const res = await refreshAccessToken(refreshToken);

    if (res?.accessToken) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", res.accessToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return response;
    }

    // Refresh failed → force logout
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}
