import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { ILatLng } from '@geo-ball/geo-core';
import { INominatimParams, NominatimApi, INominatimResult } from '@geo-ball/osm-data';

// const x = {
//     "x": "-111.979898461856",
//     "y": "40.7900661",
//     "label": "Salt Lake City International Airport, Drop Off Zone, Salt Lake City, Salt Lake County, Utah, UT 84116, USA",
//     "bounds": [[40.7656704, -112.0029773], [40.8138262, -111.953659]],
//     "raw": {
//         "boundingbox": ["40.7656704", "40.8138262", "-112.0029773", "-111.953659"],
//         "class": "aeroway",
//         "display_name": "Salt Lake City International Airport, Drop Off Zone, Salt Lake City, Salt Lake County, Utah, UT 84116, USA",
//         "icon": "https://nominatim.openstreetmap.org/images/mapicons/transport_airport2.p.20.png",
//         "importance": 0.399263167254904,
//         "lat": "40.7900661",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "lon": "-111.979898461856",
//         "osm_id": "33005585",
//         "osm_type": "way",
//         "place_id": "84363167",
//         "type": "aerodrome",
//     }
// }

// const y = {
//     "x": "-111.8504945",
//     "y": "40.71684685",
//     "label": "2516, Chadwick Street, Sugar House, Salt Lake City, Salt Lake County, Utah, 84106, USA",
//     "bounds": [[40.7168063, -111.8505597], [40.7168874, -111.8504293]],
//     "raw": {
//         "place_id": "182514424",
//         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
//         "osm_type": "way",
//         "osm_id": "501552534",
//         "boundingbox": ["40.7168063", "40.7168874", "-111.8505597", "-111.8504293"],
//         "lat": "40.71684685",
//         "lon": "-111.8504945",
//         "display_name": "2516, Chadwick Street, Sugar House, Salt Lake City, Salt Lake County, Utah, 84106, USA",
//         "class": "building",
//         "type": "yes",
//         "importance": 1.4409999999999998
//     }
// };
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

const provider = new OpenStreetMapProvider();

export const geocodeSimpleAddress = async (address: string): Promise<Array<IGeocodeResponse>> => {
    console.log('geocodeSimpleAddress');
    return provider.search({ query: address }).then((json: Array<IGeocodeResponse>) => {
        console.log('Array<IGeocodeResponse>:', json);
        return json;
    });
};
export const geocodeAddress = async (
    params: INominatimParams,
): Promise<Array<INominatimResult>> => {
    console.log('geocodeAddress');

    return NominatimApi.Geocode(params).then((json: Array<INominatimResult>) => {
        console.log('Array<INominatimResult>:', json);
        return json;
    });
};

export const reverseGeocodeLocation = async (p: ILatLng): Promise<IReverseGeocodeResponse> => {
    console.log('reverseGeocodeLocation');
    const paramString = getParamString({
        format: 'json',
        lat: p.lat,
        lon: p.lng,
        addressDetails: 1,
    });
    const url = `https://nominatim.openstreetmap.org/reverse?${paramString}`;
    console.log('url:', url);
    return fetch(url)
        .then(response => {
            console.log('resp:', response);
            return response.json();
        })
        .then((json: IReverseGeocodeResponse) => {
            console.log('json:', json);
            return json;
        });
};

const getParamString = (params: any): string => {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};
