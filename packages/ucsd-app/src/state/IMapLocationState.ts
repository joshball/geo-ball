
import { LatLngLiteral, LatLngBounds } from 'leaflet';
import { IGeoSearchResult } from '../services/IGeoSearchResult';

export interface IMapLocationState {
    zoom: number;
    center: LatLngLiteral;
    clickPos: LatLngLiteral | undefined;
    selectedAddress: IGeoSearchResult | undefined;
}


export interface IMapExplorerState {
    location: IMapLocState;
    display: IMapDisplayState;
    address: IMapAddressState;
}


export interface IMapLocState {
    zoom: number;
    center: LatLngLiteral;
}

export interface IMapAddressState {
    selectedAddress: IGeoSearchResult | null;
    geoSearchResults: Array<IGeoSearchResult>;
}

export interface IMapDisplayState {
    bounds: LatLngBounds | null;
    clickPos: LatLngLiteral | null;
    mousePos: LatLngLiteral | null;
}
