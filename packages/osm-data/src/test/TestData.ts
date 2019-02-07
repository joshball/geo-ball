import { OpenStreetmapQuery, IOpenStreetmapQuery, OpenStreetmapFileMetaData } from "..";
import { LatLngBounds, LatLng, ILatLngBounds } from '@geo-ball/geo-core';

import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";


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
	const objBounds:ILatLngBounds = {
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

export const createNewOpenStreetmapFileMetaData = (): OpenStreetmapFileMetaData => {
	const { query, queryName, queryDesc, latLngBounds } = createNewOpenStreetmapQuery();
	return new OpenStreetmapFileMetaData('osm-endpoint', query, queryName, queryDesc, latLngBounds);
};

export const createNewOpenStreetmapQuery = (latLngBoundsTestData?: ILatLngBoundsTestData) => {
	latLngBoundsTestData = latLngBoundsTestData || createNewBounds();
    const osmQuery:IOpenStreetmapQuery = { latLngBounds:latLngBoundsTestData.latLngBounds };
    const query = new OpenStreetmapQuery(osmQuery);
    const queryName = 'queryName';
    const queryDesc = 'queryDesc';
    const latLngBounds = latLngBoundsTestData.latLngBounds;
	return {
        query,
        queryName,
        queryDesc,
        latLngBounds,
		latLngBoundsTestData
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
