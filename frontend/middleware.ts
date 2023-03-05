import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {  getCookie } from 'cookies-next';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // console.log(request.cookies.has("next-auth.session-token"))
    const hasToken = request.cookies.has("next-auth.session-token")
    getCookie('next-auth.session-token');

    if(hasToken) {
        return NextResponse.rewrite(new URL(`/user/userid`, request.url))
    } else {
        return  NextResponse.rewrite(new URL(`/login`, request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}