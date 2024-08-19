import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	//  CHECK IF THE ROUTE IS PROTECTED
	const protectedRoutes = ["/dashboard", "/users", "/tasks"];
	const currentPath = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(currentPath);
	if (isProtectedRoute) {
		// CHECK FOR VALID SESSION
		const cookie = cookies().get("user-session")?.value;
		if (!cookie) {
			// IF NO COOKIE, REDIRECT TO LOGIN PAGE
			return NextResponse.redirect(new URL("/login", req.url));
		}
		const session = await decrypt(cookie);
		// REDIRECT UNAUTHED USERS
		if (!session) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
	}

	// RENDER ROUTE
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image).*)"],
};
