import React from 'react'
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const api = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: '1200px',
    height: '700px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

export const Map = () => {
    return (
        <LoadScript
            googleMapsApiKey={api}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                <Marker center={center} />
            </GoogleMap>
        </LoadScript>
    )
}
