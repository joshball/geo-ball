import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
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
