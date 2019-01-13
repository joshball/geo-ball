import * as React from 'react'
import { Map, Marker, Popup, TileLayer, MapControl } from 'react-leaflet';
import { css } from 'glamor'
import { GeographicPoint } from '@ball-maps/geo-core';
import { LatLngTuple } from 'leaflet';
// import LocationSelector from './LocationSelector';
import { MapLocation } from '../services/MapLocation';

const mapCss = css({
    height: '100%',
    width: '100%',
    margin: '0 auto',
})

export class MapProps {
    position!: LatLngTuple;
    intersections!: Array<GeographicPoint>;
}

const mapLocations = [
    new MapLocation('San Diego (UCSD)', [32.8741164, -117.2382689], 'sd.map'),
    new MapLocation('Salt Lake City', [32.8741164, -117.2382689], 'slc.map'),
    new MapLocation('Santa Barbara', [32.8741164, -117.2382689], 'sb.map'),
    new MapLocation('Seattle', [32.8741164, -117.2382689], 'seattle.map'),
];

const selected = mapLocations[0].name;

const onSubmit = (locationName: string) => {
    console.log('Got a new location:', locationName);
}

export const MapComponent: React.SFC<MapProps> = (props: MapProps) => {
    const { position, intersections } = props;

    const markers = intersections.map((latLng: GeographicPoint, index: number) => {
        const p = new GeographicPoint(latLng.latitude, latLng.longitude);
        // console.log('g/p', index, p.toString());
        return (
            <Marker key={index} position={[p.latitude, p.longitude] as LatLngTuple}>
                <Popup>{p.toString()}</Popup>
            </Marker>
        );
    });
    console.log(`Created ${markers.length} markers`)
    return (
        <Map className={`${mapCss}`} center={position} zoom={17}>
            {/* <MapControl>
                <LocationSelector locations={mapLocations} selectedName={selected} onSubmit={onSubmit} />
            </MapControl> */}
            <TileLayer
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position}>
                {markers}
            </Marker>
        </Map>)
}


