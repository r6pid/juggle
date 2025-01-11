import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export default async function middleware(req: NextRequest) {
	// const session = await auth();
	// const path = req.nextUrl.pathname;

	// const isProtectedRoute = protectedRoutes.includes(path);

	// const isPublicRoute = publicRoutes.includes(path);

	// if (isProtectedRoute && !session) {
	// 	return NextResponse.redirect(new URL("/login", req.nextUrl));
	// }
	// if (isPublicRoute && session?.user) {
	// 	return NextResponse.redirect(new URL("/admin/profile", req.nextUrl));
	// }
	// if (path == "/admin") {
	// 	return NextResponse.redirect(new URL("/admin/profile", req.nextUrl));
	// }
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};