import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {  getCookie } from 'cookies-next';
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const hasToken = request.cookies.has("next-auth.session-token")
    // const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
    // console.log("id", decoded.id)


    if(hasToken) {
        return NextResponse.rewrite(new URL(`/user/640858d450b116389bf218aa`, request.url))
    } else {
        return  NextResponse.rewrite(new URL(`/login`, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user',
}