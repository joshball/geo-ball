import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { LatLng, LatLngBounds } from 'leaflet';
import { MapComponent } from './MapData/MapComponent';
import { AddressSearchComponent } from './MapData/AddressSearchComponent';
import { MapDataDisplay } from './MapData/MapDataDisplay';
import { MapState } from '../stores/MapState';
import { ChangeMapTilesComponent } from './MapData/ChangeMapTilesComponent';

const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 400px',
    gridTemplateAreas: 'main sidebar',
});

const sideLayout = css({
    marginLeft: '10px',
});

const swBound: LatLng = new LatLng(40.7, -111.7);
const neBound: LatLng = new LatLng(40.8, -111.8);
// const startingCenter: LatLngTuple = [40.7563038, -111.8781928];
const startingCenter: LatLng = new LatLng(40.7563038, -111.8781928);
const startingBounds: LatLngBounds = new LatLngBounds(swBound, neBound);

export interface MapProps {
    // location!: MapLocation;
    // position!: LatLng;
    // mapState: MapState;
    mapState?: MapState;
}

@inject("mapState")
@inject("stores")
@observer
export class MapDownloadPage extends React.Component<MapProps> {

    render() {
        // console.log('MapDownloadPage.props:', this.props);
        const mapState = this.props.mapState!;
        // mapState.changeIt();
        // console.log('MapDownloadPage.mapState:', mapState);
        return (
            <div className={`${mainLayout}`}>
                <main className="main">
                    <MapComponent />
                </main>
                <aside className="sidebar">
                    <div className={`${sideLayout}`}>
                        <MapDataDisplay />
                        <ChangeMapTilesComponent />
                        <AddressSearchComponent />
                        {/* <LocationSelector locations={mapLocations} selectedName={selectedMapLocation.name} onSubmit={onSubmit} /> */}
                    </div>
                </aside>
            </div>
        )
    }

}
