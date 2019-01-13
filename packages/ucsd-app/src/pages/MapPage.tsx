import * as React from 'react'
import { css } from 'glamor'

import MapContainer from './MapContainer';
// import LocationSelector from './LocationSelector';
import { MapLocation } from '../services/MapLocation';
import { getIntersections } from '../services/MapService';
import { map } from 'leaflet';

const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 400px',
    gridTemplateAreas: 'main sidebar',
});

interface MapPageState {
    // intersections: Array<GeographicPoint>;
    intersections: Array<MapLocation>;
}

// tslint:disable-next-line:no-empty-interface
interface MapPageProps {
    // mapLocation: MapLocation;
}

export class MapPage extends React.Component<MapPageProps, MapPageState> {

    constructor(props: MapPageProps) {
        super(props);
        this.state = {
            intersections: [],
        };
    }

    public componentDidMount() {
        getIntersections()
            .then(intersections => {
                this.setState({ intersections });
            });
    }

    public render() {
        // const { mapLocation } = this.props;
        // console.log('mapLocation', mapLocation);
        const { intersections } = this.state;
        console.log('intersections', intersections);
        return (
            <div>
                <h1>HEY  HEY</h1>
                <h1>{intersections.length}</h1>
            </div>
        );
        // <MapComponent position={mapLocation.center} intersections={this.state.intersections} />
    }
}

// export const MapPage: React.SFC<any> = (props: any) => {
//     const mapLocations = [
//         new MapLocation('San Diego (UCSD)', [32.8741164, -117.2382689], 'sd.map'),
//         new MapLocation('Salt Lake City', [40.7563038, -111.8781928], 'slc.map'),
//         new MapLocation('Santa Barbara', [32.8741164, -117.2382689], 'sb.map'),
//         new MapLocation('Seattle', [32.8741164, -117.2382689], 'seattle.map'),
//     ];
//     // const getLocationByName(name: string): MapLocation => {
//     //     return mapLocations.find(l => l.name === name);
//     // }
//     const selectedMapLocation = mapLocations[0];
//     const onSubmit = (locationName: string) => {
//         console.log('Got a new location:', locationName);
//     }
//     return (
//         <div className={`${mainLayout}`}>
//             <main className="main">
//                 <MapContainer mapLocation={selectedMapLocation} />
//             </main>
//             <aside className="sidebar">
//                 <h1>Sidebar</h1>
//                 {/* <LocationSelector locations={mapLocations} selectedName={selectedMapLocation.name} onSubmit={onSubmit} /> */}
//             </aside>
//         </div>
//     )
// }
