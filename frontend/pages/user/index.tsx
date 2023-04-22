import React from 'react';
import {GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";
import {IUserModel} from "@/lib/util/schema";
import ProtectedHero from "@/components/hero-page/ProtectedHero";

type UserProps = {
    user: IUserModel
}

const MyPage = ({user}: UserProps) => {
    return (
        <div>
            <ProtectedHero/>
        </div>
    );
};

export default MyPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
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
    const userData = result.data.user

    return {
        props: {
            user: userData
        }
    }
}