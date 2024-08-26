import { verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

//  SPECIFY PROTECTED AND PUBLIC ROUTES

const ROUTE_CONFIG = {
	PUBLIC: new Set(["/login", "/register", "/"]),
	PROTECTED: new Set(["/my-tasks"]),
	ADMIN: new Set(["/dashboard", "/users", "/all-tasks"]),
};
export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const session = await verifySession();

	const redirect = (destination: string) => {
		NextResponse.rewrite(new URL(destination, req.nextUrl));
	};
	// check if the route is public
	if (ROUTE_CONFIG.PUBLIC.has(path)) {
		// then allow access
		return NextResponse.next();
	}

	// if no session.
	if (session === null) {
		// then redirect to login for non-public routes.
		return redirect("/login");
	}

	// check for admin routes, but use is not admin.
	if (ROUTE_CONFIG.ADMIN.has(path) && session.role !== "admin") {
		// then redirect to not-authorized.
		return redirect("/not-authorized");
	}

	// allow access to protected routes for logged-in users
	if (ROUTE_CONFIG.PROTECTED.has(path)) {
		return NextResponse.next();
	}

	// for any other routes, proceed normally.
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|/public/uploads).*)"],
};
