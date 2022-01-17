import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from "react";
export class GMap extends Component {
    render() {
        return (
            <Map google={this.props.google}
                style={{ width: "100%", height: "100%" }}
                zoom={14}
                initialCenter={
                    {
                        lat: 19.024448758444095,
                        lng: 72.84437282905316
                    }

                }>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDIby30kmEEd9u0P1EQnv9KJDiK1YEn9Rs"
})(GMap)