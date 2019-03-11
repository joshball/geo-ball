import { IGeocodeResponse } from '../services/GeocodingService';
import { LatLngBounds, ILatLng, ILatLngBounds } from '@geo-ball/geo-core';
import { observable, decorate } from 'mobx';

// ==========================================================================
//          DEFAULT STATE
// ==========================================================================

const defaultState: IMapExplorerState = {
    location: {
        zoom: 19,
        center: { lat: 40.716847, lng: -111.850494 },
    },
    display: {
        bounds: null,
        clickPos: null,
        mousePos: null,
    },
    address: {
        selectedAddress: null,
        geoSearchResults: [],
    },
};

// ==========================================================================
//              MapExplorerState
// ==========================================================================

export interface IMapExplorerState {
    location: IMapLocState;
    display: IMapDisplayState;
    address: IMapAddressState;
}

export class MapExplorerState implements IMapExplorerState {
    location: MapLocState;
    display: MapDisplayState;
    address: MapAddressState;

    constructor(mapExplorerState: IMapExplorerState = defaultState) {
        this.location = new MapLocState(mapExplorerState.location);
        this.display = new MapDisplayState(mapExplorerState.display);
        this.address = new MapAddressState(mapExplorerState.address);
    }
}
decorate(MapExplorerState, {
    location: observable,
    display: observable,
    address: observable,
});

// ==========================================================================
//              MapLocState
// ==========================================================================

export interface IMapLocState {
    zoom: number;
    center: ILatLng;
}

export class MapLocState implements IMapLocState {
    zoom: number;
    center: ILatLng;

    constructor(mapLocationState: IMapLocState = defaultState.location) {
        this.zoom = mapLocationState.zoom;
        this.center = mapLocationState.center;
    }
}
decorate(MapLocState, {
    zoom: observable,
    center: observable,
});

// ==========================================================================
//              MapAddressState
// ==========================================================================

export interface IMapAddressState {
    selectedAddress: IGeocodeResponse | null;
    geoSearchResults: Array<IGeocodeResponse>;
}

export class MapAddressState implements IMapAddressState {
    selectedAddress: IGeocodeResponse | null;
    geoSearchResults: Array<IGeocodeResponse>;

    constructor(mapAddressState: IMapAddressState = defaultState.address) {
        this.selectedAddress = mapAddressState.selectedAddress;
        this.geoSearchResults = mapAddressState.geoSearchResults || [];
    }
}

decorate(MapAddressState, {
    selectedAddress: observable,
    geoSearchResults: observable,
});

// ==========================================================================
//              MapDisplayState
// ==========================================================================

export interface IMapDisplayState {
    bounds: ILatLngBounds | null;
    clickPos: ILatLng | null;
    mousePos: ILatLng | null;
}

export class MapDisplayState implements IMapDisplayState {
    bounds: LatLngBounds | null;
    clickPos: ILatLng | null;
    mousePos: ILatLng | null;

    constructor(mds: IMapDisplayState = defaultState.display) {
        this.bounds = mds.bounds ? LatLngBounds.FromBounds(mds.bounds) : null;
        this.clickPos = mds.clickPos;
        this.mousePos = mds.mousePos;
    }
}
decorate(MapDisplayState, {
    bounds: observable,
    clickPos: observable,
    mousePos: observable,
});
