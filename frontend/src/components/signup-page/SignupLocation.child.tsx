import React, {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react';
import {Box, Stack, TextField, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useUserContext} from "@/lib/context/userInputContext";
import LocationInput from "@/components/elements/molecules/LocationInput";
import {useSession} from "next-auth/react";

type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const SignupLocationChild = ({setChildComponent}: Props) => {
    const {location, setLocation, setName, setEmail} = useUserContext()
    const {data: session, status} = useSession()

    return (
        <Box width="100%" height="26rem" sx={{position: "relative"}}>
            <Typography variant="h2" textAlign="center" my={4}>Create your account</Typography>
            <Stack direction="column" sx={{mb: 4}}>
                <Typography variant="h4" textAlign="center">Tell us your current location</Typography>
                <LocationInput location={location} setLocation={setLocation} placeholder="location"/>
            </Stack>
            <Box sx={{position: "absolute", bottom: "0", width:"100%", zIndex:1}}>
                <TriggerButton title="Next" color="#154807" onClick={() => {
                    setChildComponent(4)
                }}/>
            </Box>
        </Box>
    );
};

export default SignupLocationChild;