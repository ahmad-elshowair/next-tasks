import { verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

// DEFINE ROUTES SPECIFIC ROUTES.
const ROUTES_CONFIG = {
	PUBLIC: new Set(["/login", "/register", "/"]),
	PROTECTED: new Set(["/my-tasks"]),
	ADMIN: new Set(["/dashboard", "/users", "/all-tasks"]),
};

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	// REDIRECTION FUNCTION
	const redirect = (destination: string) => {
		return NextResponse.redirect(new URL(destination, req.url));
	};

	// IF THE ROUTE IS PUBLIC, THEN ALLOW ACCESS.
	if (ROUTES_CONFIG.PUBLIC.has(path)) {
		return NextResponse.next();
	}

	// VERIFY SESSION
	const session = await verifySession();

	// IF NO SESSION, THEN REDIRECT TO LOGIN PAGE.
	if (!session) {
		return redirect("/login");
	}

	// IF THE ROUTE IS ADMIN ROUTE, THEN REDIRECT TO NOT AUTHORIZED PAGE
	if (ROUTES_CONFIG.ADMIN.has(path) && session.role !== "admin") {
		return redirect("/not-authorized");
	}

	// IF THE PATH IS PROTECTED, THEN ALLOW ACCESS IF LOGGED IN.
	if (ROUTES_CONFIG.PROTECTED.has(path)) {
		return NextResponse.next();
	}

	// ALLOW ACCESS FOR ANY OTHER ROUTES,
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|/uploads).*)"],
};
