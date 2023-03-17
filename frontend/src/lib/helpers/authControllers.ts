import {signIn} from "next-auth/react";
import {IUser} from "@/types/IUser";
import {router} from "next/client";
import {Session} from "next-auth";

export const loginWithCredential = async (email: string, password: string) => {
    await signIn('credentials', {
        email: email,
        password: password,
    })
}

export const registerUser = async ({name, email, password, passwordConfirm, interests, location}: IUser, session: Session | null) => {
    try {
        const response = await fetch('/api/user/register', {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
                interests,
                location
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const userData = await response.json()
        if(userData.status === 'success' && session === null) {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: `/user`
            })
        } else if (userData.status === 'success' && session) {
            await router.push('/user')

        } else {
            await router.push('/error')
        }

    } catch (e: any) {
        console.log('error!!', e)
    }
}