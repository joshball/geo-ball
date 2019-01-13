import * as React from 'react';

// tslint:disable-next-line:no-implicit-dependencies
import { GeographicPoint } from '@ball-maps/geo-core';
import { MapComponent } from './MapComponent';
import { MapLocation } from '../services/MapLocation';


interface MapContainerState {
    intersections: Array<GeographicPoint>;
}

interface MapContainerProps {
    mapLocation: MapLocation;
}


class MapContainer extends React.Component<MapContainerProps, MapContainerState> {

    constructor(props: MapContainerProps) {
        super(props);
        this.state = {
            intersections: [],
        };
    }

    public componentDidMount() {
        // const url = 'http://localhost:3000/maps/sugarhouseone.map';
        const url = 'http://localhost:3000/maps/ucsd.map/intersections';
        console.log('fetching url:', url);
        fetch(url)
            .then(res => res.json())
            .then(intersections => {
                this.setState({ intersections });
            });
    }
    public render() {
        const { mapLocation } = this.props;
        console.log('mapLocation', mapLocation);
        console.log('intersections', this.state.intersections);

        return (
            <MapComponent position={mapLocation.center} intersections={this.state.intersections} />
        );
    }
}

export default MapContainer;
