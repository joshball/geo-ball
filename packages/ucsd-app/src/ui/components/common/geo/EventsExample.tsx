import * as React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LocationEvent, ErrorEvent, LeafletMouseEvent } from 'leaflet';

// tslint:disable-next-line:interface-over-type-literal
type State = {
    hasLocation: boolean;
    latlng: {
        lat: number;
        lng: number;
    };
};
// tslint:disable-next-line:interface-over-type-literal
type Props = {};

export default class EventsExample extends React.Component<Props, State> {
    state = {
        hasLocation: false,
        latlng: {
            lat: 51.505,
            lng: -0.09,
        },
    };

    mapRef = React.createRef<Map>();

    handleClick = (e: LeafletMouseEvent) => {
        console.log('click', e.latlng);
        const map = this.mapRef.current as any;
        console.log('click this.mapRef', this.mapRef);
        console.log('click map', map);
        console.log('click map', map.leafletElement.getBounds());
        if (map != null) {
            map.leafletElement.locate();
        }
    };

    handleLocationFound = (e: LocationEvent) => {
        console.log('locFound', e);
        this.setState({
            hasLocation: true,
            latlng: e.latlng,
        });
    };
    handleLocationError = (e: ErrorEvent) => {
        console.log('handleLocationError', e);
    };

    render() {
        const marker = this.state.hasLocation ? (
            <Marker position={this.state.latlng}>
                <Popup>You are here</Popup>
            </Marker>
        ) : null;

        return (
            <Map
                center={this.state.latlng}
                // length={4}
                onclick={this.handleClick}
                onlocationfound={this.handleLocationFound}
                onlocationerror={this.handleLocationError}
                ref={this.mapRef}
                zoom={13}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marker}
            </Map>
        );
    }
}
