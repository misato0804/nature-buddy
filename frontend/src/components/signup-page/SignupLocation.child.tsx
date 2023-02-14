import React, {useState} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

const SignupLocationChild = () => {
    const [location, setLocation] = useState("")
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

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e.currentTarget.value);
    };

    const handleSelect =
        ({description}: { description: string }) => () => {
            // When user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({address: description}).then((results) => {
                const {lat, lng} = getLatLng(results[0]);
                console.log(description)
                console.log("📍 Coordinates: ", {lat, lng});
            });
        };
    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: {main_text, secondary_text},
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <Box width="100%">
            <Typography variant="h2" textAlign="center" my={4}>Create your account</Typography>
            <Stack direction="column" spacing={2}>
                <Typography variant="h4" textAlign="center">Tell us your current location</Typography>

                <input
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Where are you going?"
                />
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul>{renderSuggestions()}</ul>}

            </Stack>

        </Box>
    );
};

export default SignupLocationChild;