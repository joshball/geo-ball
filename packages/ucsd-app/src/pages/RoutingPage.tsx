import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { LatLng, LatLngBounds } from 'leaflet';
import { MapComponent } from '../components/map/MapComponent';
import { RootStore } from '../stores/RootStore';
import { MapDataDisplay } from '../components/map/MapDataDisplay';
import { ChangeMapTilesComponent } from '../components/map/ChangeMapTilesComponent';
import { AddressSearchComponent } from '../components/map/AddressSearchComponent';

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
export class RoutingPage extends React.Component<MapProps> {

    render() {
        console.log('RoutingPage.render():', this.props);
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
                    </div>
                </aside>
            </div>
        )
    }

}
