import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {  getCookie } from 'cookies-next';
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const hasToken = request.cookies.has("next-auth.session-token")
    // const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    // console.log("id", decoded.id)
    const userId = request.cookies.get("userId")?.value
    console.log(userId)

    if(hasToken) {
        return NextResponse.rewrite(new URL(`/user/${userId}`, request.url))
    } else {
        return  NextResponse.rewrite(new URL(`/login`, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user',
}