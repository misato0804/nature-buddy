import {GoogleMap, LoadScript} from '@react-google-maps/api';
import {Box} from "@mui/material";
import {number} from "prop-types";
import { Marker } from '@react-google-maps/api';

type Size = {
    width: string | number,
    height: string | number
}

export type CenterCoordinate = {
    lat: number,
    lng: number
}

type MapProps = {
    containerStyle: Size,
    center: CenterCoordinate,
    zoom: number
}

const GoogleMapComponent = ({containerStyle, center, zoom}: MapProps) => {
    return (
        <Box>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
            >
                <Marker
                    position={center}
                />
            </GoogleMap>

        </Box>
    );
};

export default GoogleMapComponent;