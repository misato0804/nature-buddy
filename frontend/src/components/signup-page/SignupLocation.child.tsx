import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {Box, List, ListItemText, Stack, TextField, Typography} from "@mui/material";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useUserContext} from "@/lib/context/userInputContext";

type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const SignupLocationChild = ({setChildComponent}: Props) => {
    const {location, setLocation} = useUserContext()
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };


    const handleSelect =
        ({description}: { description: string }) => () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();
            getGeocode({address: description}).then((results) => {
                const {lat, lng} = getLatLng(results[0]);
                setLocation({...location, lat, lng})
            });
        };
    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {place_id, structured_formatting: {main_text, secondary_text}} = suggestion;
            return (
                <ListItemText
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                    sx={{px: 1.5, py: .5, cursor: "pointer", "&:hover": {backgroundColor: "rgb(228,240,255)"}}}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </ListItemText>
            );
        });

    return (
        <Box width="100%" height="26rem" sx={{position: "relative"}}>
            <Typography variant="h2" textAlign="center" my={4}>Create your account</Typography>
            <Stack direction="column" sx={{mb: 4}}>
                <Typography variant="h4" textAlign="center">Tell us your current location</Typography>
                <TextField
                    value={value}
                    onChange={handleInput}
                    // disabled={!ready}
                    placeholder="Type your location"
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <List sx={{backgroundColor: "rgb(228,229,231)", zIndex:10}}>{renderSuggestions()}</List>}
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