import { OpenStreetmapQuery, IOpenStreetmapQuery, OpenStreetmapFileMetaData, IOpenStreetmapFileMetaData, GeographicBoundsDescription, IGeographicBoundsDescription } from "..";
import { LatLngBounds, LatLng, ILatLngBounds } from '@geo-ball/geo-core';

import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
import { LocalDateTime } from '@geo-ball/utils';


export interface ILatLngBoundsTestData {
    objBounds: ILatLngBounds;
    sw: LatLng;
    ne: LatLng;
    latLngBounds: LatLngBounds;
};

export interface IOsmQuery {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
};

export const createNewBounds = (): ILatLngBoundsTestData => {
    const objBounds: ILatLngBounds = {
        southWest: {
            lat: 32.859375,
            lng: -117.27233,
        },
        northEast: {
            lat: 32.902622,
            lng: -117.20367,
        }
    }
    const sw = new LatLng(objBounds.southWest.lat, objBounds.southWest.lng);
    const ne = new LatLng(objBounds.northEast.lat, objBounds.northEast.lng);
    const latLngBounds = new LatLngBounds(sw, ne);
    return {
        objBounds,
        sw,
        ne,
        latLngBounds
    };
}

export const createOsmFileMetaData = (latLngBoundsTestData?: ILatLngBoundsTestData): IOpenStreetmapFileMetaData => {
    latLngBoundsTestData = latLngBoundsTestData || createNewBounds();
    const latLngBounds = latLngBoundsTestData.latLngBounds;

    const iOsmQuery: IOpenStreetmapQuery = { latLngBounds: latLngBoundsTestData.latLngBounds };
    const osmQuery = new OpenStreetmapQuery(iOsmQuery);
    const queryName = 'queryName';
    const queryDesc = 'queryDesc';
    const originalFilePath = 'originalFilePath';
    const queryDate = LocalDateTime.Now();

    const iGeoBounds: IGeographicBoundsDescription = {
        date: queryDate,
        name: queryName,
        description: queryDesc,
        latLngBoundsArea: latLngBounds,
        address: '123 State St, Salt Lake City, UT 8401',
        geocodedAddress: '123 State St, Salt Lake City, UT 8401',
    }
    const geoBounds = new GeographicBoundsDescription(iGeoBounds);
    return {
        osmServer: 'osm-endpoint',
        osmQuery,
        queryDate,
        geoBounds,
        originalFilePath
    };
};


export const dataDir = '.';


export const osmJsonResp: IOpenStreetmapQueryResponse = {
    "version": 0.6,
    "generator": "Overpass API 0.7.55.4 3079d8ea",
    "osm3s": {
        "timestamp_osm_base": "2018-10-23T19:14:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "node",
            "id": 83550018,
            "lat": 40.7192445,
            "lon": -111.8535611,
            "tags": {
                "highway": "traffic_signals"
            }
        }
    ]
};
