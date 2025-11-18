import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  //   if (accessToken && refreshToken) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

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
