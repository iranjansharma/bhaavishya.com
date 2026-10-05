import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";
import { VIEW_COOKIE, isView, viewForDevice } from "@/lib/view";

/**
 * Sends every visitor to the right version of the site:
 *
 *   phones              →  app/mobile/...
 *   computers, tablets  →  app/desktop/...
 *
 * The address bar never changes: bhavishya.app/pricing stays /pricing on both.
 *
 * Preview the other version from any page by adding ?view=mobile or ?view=desktop
 * to the address (or open /mobile or /desktop). The choice is remembered for
 * 30 days; ?view=auto goes back to automatic.
 */
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Someone opened /mobile/... or /desktop/... directly: remember it, show the normal address.
  const prefixed = pathname.match(/^\/(desktop|mobile)(\/.*)?$/);
  if (prefixed) {
    const url = request.nextUrl.clone();
    url.pathname = prefixed[2] ?? "/";
    return remember(NextResponse.redirect(url), prefixed[1]);
  }

  // 2. ?view=mobile, ?view=desktop or ?view=auto: remember (or forget) the choice.
  const asked = searchParams.get("view");
  if (asked !== null) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("view");
    return remember(NextResponse.redirect(url), asked);
  }

  // 3. A saved choice wins; otherwise decide from the device.
  const saved = request.cookies.get(VIEW_COOKIE)?.value;
  const view = isView(saved) ? saved : viewForDevice(userAgent(request).device.type);

  // 4. Serve the page from app/<view> without changing the address bar.
  const url = request.nextUrl.clone();
  url.pathname = `/${view}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function remember(response: NextResponse, choice: string): NextResponse {
  if (isView(choice)) {
    response.cookies.set(VIEW_COOKIE, choice, { path: "/", maxAge: THIRTY_DAYS, sameSite: "lax" });
  } else {
    response.cookies.delete(VIEW_COOKIE);
  }
  return response;
}

export const config = {
  matcher: [
    // Every page, but not Next.js internals or files such as images and icons.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
