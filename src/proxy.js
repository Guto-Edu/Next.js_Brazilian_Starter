import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

function startsWithRoute(pathname, routes) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  response.headers.set("x-current-path", pathname);

  const isProtectedRoute = startsWithRoute(pathname, protectedRoutes);
  const isAuthRoute = startsWithRoute(pathname, authRoutes);

  if (isProtectedRoute) {
    response.headers.set("x-route-scope", "app");
  }

  if (isAuthRoute) {
    response.headers.set("x-route-scope", "auth");
  }

  // Exemplo de proteção futura:
  // const session = request.cookies.get("starter_session")?.value;
  //
  // if (isProtectedRoute && !session) {
  //   const loginUrl = new URL("/login", request.url);
  //   loginUrl.searchParams.set("redirectTo", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
  //
  // if (session && isAuthRoute) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
