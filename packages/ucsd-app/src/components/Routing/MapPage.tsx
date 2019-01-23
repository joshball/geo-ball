import * as React from 'react'
import { css } from 'glamor'

import { getRoadSegmentsFiles, getIntersectionFiles } from '../../services/MapService';
import { LatLngTuple } from 'leaflet';
import { RoadSegmentsFile, IntersectionsFile } from '@ball-maps/ucsd-core';
import BoundsExample from '../common/BoundsExample';
import EventsExample from './../common/EventsExample';
import TooltipExample from '../common/Tooltip';

const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 400px',
    gridTemplateAreas: 'main sidebar',
});
console.log('process.env.GOOGLE_API_KEY',process.env.GOOGLE_API_KEY)

interface MapPageState {
    // intersections: Array<LatLng>;
    rsdFiles: Array<RoadSegmentsFile>;
    intFiles: Array<IntersectionsFile>;
}

// tslint:disable-next-line:no-empty-interface
interface MapPageProps {
    // mapLocation: MapLocation;
}

export class MapPage extends React.Component<MapPageProps, MapPageState> {

    constructor(props: MapPageProps) {
        super(props);
        this.state = {
            rsdFiles: [],
            intFiles: [],
        };
    }

    public componentDidMount() {
        getRoadSegmentsFiles()
            .then(rsdFiles => {
                this.setState({ rsdFiles });
                console.log('CDM.calling getIntersectionFiles', rsdFiles);
                return getIntersectionFiles();
            })
            .then(intFiles => {
                console.log('CDM.intFiles', intFiles);
                this.setState({ intFiles });
            });
    }

    public render() {
        // const { mapLocation } = this.props;
        // console.log('mapLocation', mapLocation);
        const { intFiles, rsdFiles } = this.state;
        console.log('intFiles', intFiles);
        console.log('rsdFiles', rsdFiles);
        if (rsdFiles.length < 1 || intFiles.length < 1) {
            return <div>No rsdFiles</div>;
        }

        const mapLocation = rsdFiles[0];
        const intersections = intFiles[0].intersections;
        const center = mapLocation.metaData.bounds.center().toArray() as LatLngTuple;
        console.log('center', center);
        return (
            <div className={`${mainLayout}`}>
                {/* <TooltipExample/> */}
                <EventsExample/>
                {/* <BoundsExample/> */}
                {/* <MapComponent position={center} intersections={intersections} /> */}
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
