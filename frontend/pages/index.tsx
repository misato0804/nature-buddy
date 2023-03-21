import Head from 'next/head'
import Hero from "@/components/hero-page/Hero";
import {getSession, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {Session} from "next-auth";
import ProtectedHero from "@/components/hero-page/ProtectedHero";
import {GetServerSidePropsContext} from "next";
import {IUserModel} from "@/lib/util/schema";

type UserProps = {
    user: IUserModel
}

export default function Home({user}: UserProps) {

    const {data: session, status} = useSession()
    const router = useRouter()

    if (status === "loading") {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Head>
                <title>Nature Buddy</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {
                session ? <ProtectedHero user={user}/> : <Hero/>
            }
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if(!session) {
        return {
            props: {}
        }
    }
    const email = session?.user?.email
    const res = await fetch(`http://localhost:3000/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })
    const result = await res.json()
    const userData  = result.data.user
    return {
        props: {
            user: userData
        }
    }
}