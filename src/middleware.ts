import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./utils/isAuthenticated";

const regexPattern = /^(?!\/(api|_next\/(static|image)|favicon\.ico)).*/;

const pathWithoutAuth = ["/auth/login", "/auth/register"];
const publicPath = ["/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!regexPattern.test(pathname)) return NextResponse.next();
  const isAuth = await isAuthenticated(request);

  if (![...pathWithoutAuth, ...publicPath].includes(pathname) && !isAuth) {
    const url = new URL(`/auth/login`, request.url);
    return NextResponse.redirect(url);
  }
  if (pathWithoutAuth.includes(pathname) && isAuth) {
    const url = new URL(`/`, request.url);
    return NextResponse.redirect(url);
  }
}
