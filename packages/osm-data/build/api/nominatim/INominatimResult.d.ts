export interface INominatimAddressDetail {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city_district?: string;
    city: string;
    county?: string;
    state: string;
    country: string;
    country_code: string;
    postcode?: string;
    peak?: string;
    bakery?: string;
    electronics?: string;
}
export interface INominatimResult {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox?: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address?: INominatimAddressDetail;
}
export declare const fakeSingleResult: {
    "place_id": string;
    "licence": string;
    "osm_type": string;
    "osm_id": string;
    "boundingbox": string[];
    "lat": string;
    "lon": string;
    "display_name": string;
    "class": string;
    "type": string;
    "importance": number;
}[];
export declare const fakeMultipleResults: ({
    "place_id": string;
    "licence": string;
    "osm_type": string;
    "osm_id": string;
    "boundingbox": string[];
    "lat": string;
    "lon": string;
    "display_name": string;
    "class": string;
    "type": string;
    "importance": number;
    "icon": string;
} | {
    "place_id": string;
    "licence": string;
    "osm_type": string;
    "osm_id": string;
    "boundingbox": string[];
    "lat": string;
    "lon": string;
    "display_name": string;
    "class": string;
    "type": string;
    "importance": number;
    "icon"?: undefined;
})[];
//# sourceMappingURL=INominatimResult.d.ts.map