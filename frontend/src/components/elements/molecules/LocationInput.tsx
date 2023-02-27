import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {Box, List, ListItemText, TextField} from "@mui/material";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";

type Location = {
    lat: number,
    lng: number
}

type LocationProps = {
    location: Location | undefined,
    setLocation: Dispatch<SetStateAction<Location | undefined>>,
    placeholder: string,
    setDestination? : Dispatch<SetStateAction<string>>,
    errorObj?: {error: boolean, message?: string}
}

const LocationInput = ({location, setLocation, placeholder, setDestination, errorObj}: LocationProps) => {
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
                console.log(results)
                setDestination && setDestination(results[0].formatted_address)
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
        <Box position="relative" width="100%">
            <TextField
                value={value}
                onChange={handleInput}
                // disabled={!ready}
                placeholder={placeholder}
                label={placeholder}
                fullWidth={true}
                error={errorObj && errorObj.error}
                helperText={errorObj && errorObj.message}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <List sx={{position:"absolute", top:60,backgroundColor: "rgb(228,229,231)", zIndex:10, width:"100%"}}>{renderSuggestions()}</List>}
        </Box>
    );
};

export default LocationInput;