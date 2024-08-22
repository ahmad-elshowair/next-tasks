import { verifySession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

//  SPECIFY PROTECTED AND PUBLIC ROUTES
const protectedRoutes = ["/dashboard", "/users", "/my-tasks", "/all-tasks"];
const adminRoutes = ["/dashboard", "/users", "/all-tasks"];
export default async function middleware(req: NextRequest) {
	const currentPath = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(currentPath);
	const isAdminRoute = adminRoutes.includes(currentPath);
	// GET THE session
	const session = await verifySession();

	if (isProtectedRoute) {
		if (isAdminRoute && session?.role !== "admin") {
			return NextResponse.rewrite(new URL("/not-authorized", req.url));
		}
	}

	// RENDER ROUTE
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|/upload).*)"],
};
