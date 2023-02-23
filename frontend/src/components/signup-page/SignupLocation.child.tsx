import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {Box, List, ListItemText, Stack, TextField, Typography} from "@mui/material";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useUserContext} from "@/lib/context/userInputContext";
import LocationInput from "@/components/elements/molecules/LocationInput";

type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const SignupLocationChild = ({setChildComponent}: Props) => {
    const {location, setLocation} = useUserContext()

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