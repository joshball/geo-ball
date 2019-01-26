
import { LatLngLiteral as LeafLatLngLiteral, LatLngBounds as LeafLatLngBounds } from 'leaflet';
import { IGeocodeResponse } from '../services/GeocodingService';

export interface IMapExplorerState {
    location: IMapLocState;
    display: IMapDisplayState;
    address: IMapAddressState;
}


export interface IMapLocState {
    zoom: number;
    center: LeafLatLngLiteral;
}

export interface IMapAddressState {
    selectedAddress: IGeocodeResponse | null;
    geoSearchResults: Array<IGeocodeResponse>;
}

export interface IMapDisplayState {
    bounds: LeafLatLngBounds | null;
    clickPos: LeafLatLngLiteral | null;
    mousePos: LeafLatLngLiteral | null;
}
