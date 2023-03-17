import {Box, Stack, Typography, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import Option from "@/components/elements/atoms/Option";
import {activitiesList} from "../../lib/util/activitiesList"
import {StaticImageData} from "next/image";
import {useUserContext} from "@/lib/context/userInputContext";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getProviders, signIn, useSession} from "next-auth/react";
import Router, {useRouter} from 'next/router'

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

const activitiesRender = (list: Activity[]) => {
    return list.map(activity => <Option key={activity.id} title={activity.title}/>)
}

const SignupInterestChild = () => {
    const {data: session, status} = useSession()
    const router = useRouter()
    const {
        location, name, email, password, passwordConfirm, interests, setName, setEmail,
        setInterests, setLocation, setPasswordConfirm, setPassword
    } = useUserContext()

    useEffect(() => {
        if(session && session.user) {
            setName(session.user?.name as string)
            setEmail(session.user?.email as string)
        }
    }, [])

    const handleSubmit = async () => {
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
        setName('')
        setEmail('')
        setInterests([])
        setPassword('')
        setPasswordConfirm('')
        setLocation({
            type: "spot",
            address: "",
            place_id: "",
            coordinates: [0, 0]
        })
        if (userData.status === 'success' && session === null) {
            const userId = userData.data._id.toString()
            await signIn('credentials', {
                email,
                password,
                callbackUrl: `/user/${userId}`
            })
        } else if (userData.status === 'success' && session) {
            const userId = userData.data._id.toString()
            await router.push(`/user/${userId}`)
        } else {
            await router.push('/error')
        }
    }

    return (
        <Box width="100%">
            <Typography variant="h2" textAlign="center" my={4}>Create your account</Typography>
            <Typography variant="h4" textAlign="center" mb={3}>Choose your favourite activity</Typography>
            <Grid container justifyContent="center" mb={3}>
                {activitiesRender(activitiesList)}
            </Grid>
            <TriggerButton title="Register" color="#154807" onClick={handleSubmit}/>
        </Box>
    );
};

export default SignupInterestChild;