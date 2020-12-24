import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

const getMap = (lat, long) => {
    const coordinates = { lat: lat, lng: long};
    const GMapComponent = withScriptjs(withGoogleMap(_ =>
        <GoogleMap
            defaultZoom={6}
            defaultCenter={coordinates}>
            <Marker position={coordinates} />
        </GoogleMap>
    ))

    return <GMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBdPnxAhqg0fLPw2gjFLyaWm-hmLFmenWo"
                loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
            />
}

export default getMap;