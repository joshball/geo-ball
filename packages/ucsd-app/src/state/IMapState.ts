
import { LatLngBoundsExpression, LatLngLiteral } from 'leaflet';
import { IGeoSearchResult } from '../pages/MapData/AddressSearchComponent';

export interface IMapState {
    address: IGeoSearchResult | undefined;
    updatingAddress: IGeoSearchResult | undefined;
    zoom: number;
    mousePos: LatLngLiteral | undefined;
    clickPos: LatLngLiteral | undefined;
    center: LatLngLiteral | undefined;
    bounds: LatLngBoundsExpression | undefined;
}
