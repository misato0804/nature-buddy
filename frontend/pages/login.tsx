import {useEffect, useState} from "react";
import create from "../public/assets/images/createEventTop.jpg";
import FormTemplate from "@/components/elements/organisms/FormTemplate";
import LoginTopChild from "@/components/login-page/LoginTop.child";
import LoginInputChild from "@/components/login-page/LoginInput.child";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getProviders, getSession, signIn} from "next-auth/react"

const Login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    console.log(providers)

    const [childComponent, setChildComponent] = useState<number>(1)

    const LoginChild = (childComponent: number) => {
        switch (childComponent) {
            case 1:
                return <LoginTopChild setChildComponent={setChildComponent}/>
            case 2:
                return <LoginInputChild setChildComponent={setChildComponent}/>
            default:
                return <LoginTopChild setChildComponent={setChildComponent}/>
        }
    }

    return (
        <FormTemplate image={create} childComponent={LoginChild(childComponent)}/>
    );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } };
    }

    const providers = await getProviders();

    return {
        props: { providers: providers ?? [] },
    }
}