import React, {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react';
import {Box, List, ListItemText, TextField} from "@mui/material";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {ILocation} from "@/types/ILocation";
import {MeetingDetail} from "@/lib/context/activityInputContext";

type LocationProps = {
    location: ILocation | undefined,
    setLocation: Dispatch<SetStateAction<ILocation>>,
    placeholder: string,
    errorObj?: { error: boolean, message?: string }
}

const LocationInput = ({location, setLocation, placeholder, errorObj}: LocationProps) => {
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
                setLocation({
                    ...location!,
                    coordinates: [lat, lng],
                    address: results[0].formatted_address,
                    place_id: results[0].place_id,
                })
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
                placeholder={location ? location.address : placeholder}
                label={placeholder}
                fullWidth={true}
                error={errorObj && errorObj.error}
                helperText={errorObj && errorObj.message}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <List sx={{
                position: "absolute",
                top: 60,
                backgroundColor: "rgb(228,229,231)",
                zIndex: 10,
                width: "100%"
            }}>{renderSuggestions()}</List>}
        </Box>
    );
};

export default LocationInput;