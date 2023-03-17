import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getSession} from "next-auth/react";
import {Session} from "next-auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

}

export const config = {
    matcher: '/user',
}