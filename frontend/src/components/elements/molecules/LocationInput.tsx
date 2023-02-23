import React, {ChangeEvent, Dispatch, SetStateAction, useEffect} from 'react';
import {List, ListItemText, TextField} from "@mui/material";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {suggestionList} from "graphql/jsutils/suggestionList";
import {useActivityContext} from "@/lib/context/activityInputContext";

type Location = {
    lat: number,
    lng: number
}

type LocationProps = {
    location: Location | undefined,
    setLocation: Dispatch<SetStateAction<Location | undefined>>,
    placeholder: string,
    setDestination? : Dispatch<SetStateAction<string>>
}

const LocationInput = ({location, setLocation, placeholder, setDestination}: LocationProps) => {
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

    const {destination} = useActivityContext()



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
        <>
            <TextField
                value={value}
                onChange={handleInput}
                // disabled={!ready}
                placeholder={placeholder}
                label={placeholder}
                fullWidth={true}
            />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && <List sx={{backgroundColor: "rgb(228,229,231)", zIndex:10}}>{renderSuggestions()}</List>}
        </>
    );
};

export default LocationInput;