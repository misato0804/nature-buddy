import {Box, Stack, Typography, Grid} from "@mui/material";
import React, {useState} from "react";
import Option from "@/components/elements/atoms/Option";
import {activitiesList}from "../../lib/util/activitiesList"
import {StaticImageData} from "next/image";
import {useUserContext} from "@/lib/context/userInputContext";
import TriggerButton from "@/components/elements/atoms/TriggerButton";

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

const activitiesRender = (list: Activity[]) => {
    return list.map( activity => <Option key={activity.id} title={activity.title}/> )
}

const SignupInterestChild = () => {
    const {location, name, email, password, passwordConfirm, interests} = useUserContext()

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    passwordConfirm,
                    interests,
                    location: {
                        type: "point",
                        coordinates: [location!.lat, location!.lng]
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
            const userdata = await res.json()
        } catch (e: any) {
            console.log(e)
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