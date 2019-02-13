export interface INominatimResult {
    place_id: string;
    osm_id: string;
    osm_type: string;
    boundingbox?: string[4];
    lat: string;
    lng: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon: string;
    address: {
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
    };
}
