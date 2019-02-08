import { ILatLng } from '@geo-ball/geo-core';
export interface IGeocodeResponse {
    label: string;
    raw: IGeocodeRaw;
    x: string;
    y: string;
    bounds: Array<Array<number>>;
}
export interface IGeocodeRaw {
    boundingbox: Array<string>;
    class: string;
    display_name: string;
    icon: string;
    importance: string;
    lat: string;
    license: string;
    lon: string;
    osm_id: string;
    osm_type: string;
    place_id: string;
    type: string;
}
export interface IGeocodeAddress {
    city: string;
    country: string;
    country_code: string;
    county: string;
    house_number: string;
    neighbourhood: string;
    postcode: string;
    road: string;
    state: string;
}
export interface IReverseGeocodeResponse {
    address: IGeocodeAddress;
    boundingbox: Array<string>;
    display_name: string;
    lat: string;
    lon: string;
    osm_id: string;
    osm_type: string;
    place_id: string;
}
export declare const geocodeAddress: (address: string) => Promise<IGeocodeResponse[]>;
export declare const reverseGeocodeLocation: (p: ILatLng) => Promise<IReverseGeocodeResponse>;
//# sourceMappingURL=GeocodingService.d.ts.map