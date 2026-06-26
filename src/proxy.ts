import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AB_PREFETCH_COOKIE,
  resolveAbVariant,
} from "@/lib/ab-testing";

const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

function hasSessionCookie(request: NextRequest): boolean {
  return SESSION_COOKIES.some((name) => request.cookies.has(name));
}

export function proxy(request: NextRequest) {
  const forcedVariant = request.nextUrl.searchParams.get("ab_prefetch");
  const currentVariant = request.cookies.get(AB_PREFETCH_COOKIE)?.value;
  const variant = resolveAbVariant(currentVariant, forcedVariant);

  const shouldSetCookie =
    forcedVariant === "A" ||
    forcedVariant === "B" ||
    currentVariant !== variant;

  if (request.nextUrl.pathname.startsWith("/admin") && !hasSessionCookie(request)) {
    const redirect = NextResponse.redirect(new URL("/", request.url));

    if (shouldSetCookie) {
      redirect.cookies.set(AB_PREFETCH_COOKIE, variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    return redirect;
  }

  const response = NextResponse.next();

  if (shouldSetCookie) {
    response.cookies.set(AB_PREFETCH_COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
