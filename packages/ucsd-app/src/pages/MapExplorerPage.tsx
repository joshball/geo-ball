import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { LatLng, LatLngBounds } from 'leaflet';
import { MapComponent } from '../components/map/MapComponent';
import { AddressSearchComponent } from '../components/map/AddressSearchComponent';
import { MapDataDisplay } from '../components/map/MapDataDisplay';
import { ChangeMapTilesComponent } from '../components/map/ChangeMapTilesComponent';
import { RootStore } from '../stores/RootStore';

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
    stores?: RootStore;
}

@inject("stores")
@observer
export class MapExplorerPage extends React.Component<MapProps> {

    render() {
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
