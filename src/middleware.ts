import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "umkm_admin_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    const tokenCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isLoginPage = pathname === "/admin/login";

    let hasValidToken = false;
    if (tokenCookie && tokenCookie.includes(".")) {
      try {
        const [encodedPayload] = tokenCookie.split(".");
        const decodedStr = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(decodedStr);
        if (payload.exp && Date.now() < payload.exp) {
          hasValidToken = true;
        }
      } catch {
        hasValidToken = false;
      }
    }

    // If trying to access admin pages (not login) without valid session, redirect to login
    if (!isLoginPage && !hasValidToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If already logged in and visiting /admin/login, redirect to /admin dashboard
    if (isLoginPage && hasValidToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
