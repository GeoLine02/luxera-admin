import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch("http://localhost:3000/api/auth/refresh", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${refreshToken}`,
      },
    });

    if (res.status === 401) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const authRoutes = ["/signin", "/register"];
  const protectedRotues = ["/"];

  if (accessToken && refreshToken) {
    if (authRoutes.some((route) => pathname === route)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!accessToken && !refreshToken) {
    if (protectedRotues.some((route) => pathname === route)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!accessToken && refreshToken) {
    const res = await refreshAccessToken(refreshToken);

    if (res.accessToken) {
      const response = NextResponse.next();

      response.cookies.set({
        name: "accessToken",
        value: res.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        // maxAge: 15 * 60, // optional: set expiry
      });

      return response;
    } else {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("refreshToken");
      response.cookies.delete("accessToken");
      return response;
    }
  }
}
