
import { IGeocodeResponse } from '../services/GeocodingService';
import { LatLng, LatLngBounds, ILatLng } from '@geo-ball/geo-core';

export interface IMapExplorerState {
    location: IMapLocState;
    display: IMapDisplayState;
    address: IMapAddressState;
}


export interface IMapLocState {
    zoom: number;
    center: ILatLng;
}

export interface IMapAddressState {
    selectedAddress: IGeocodeResponse | null;
    geoSearchResults: Array<IGeocodeResponse>;
}

export interface IMapDisplayState {
    bounds: LatLngBounds | null;
    clickPos: LatLng | null;
    mousePos: LatLng | null;
}
