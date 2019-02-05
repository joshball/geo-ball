import { OpenStreetmapQuery, IOpenStreetmapQuery, OpenStreetmapFileMetaData } from "..";
import { LatLngBounds, LatLng, ILatLngBounds } from '@ball-maps/geo-core';

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
		sw: {
			lat: 32.859375,
			lng: -117.27233,
		},
		ne: {
			lat: 32.902622,
			lng: -117.20367,
		}
	}
	const sw = new LatLng(objBounds.sw.lat, objBounds.sw.lng);
	const ne = new LatLng(objBounds.ne.lat, objBounds.ne.lng);
	const latLngBounds = new LatLngBounds(sw, ne);
	return {
		objBounds,
		sw,
		ne,
		latLngBounds
	};
}

export const createNewOpenStreetmapFileMetaData = (): OpenStreetmapFileMetaData => {
	const { query } = createNewOpenStreetmapQuery();
	return new OpenStreetmapFileMetaData('osm-endpoint', query);
};

export const createNewOpenStreetmapQuery = (latLngBoundsTestData?: ILatLngBoundsTestData) => {
	latLngBoundsTestData = latLngBoundsTestData || createNewBounds();
    const osmQuery:IOpenStreetmapQuery = { latLngBounds:latLngBoundsTestData.latLngBounds };
	const query = new OpenStreetmapQuery(osmQuery);
	return {
		query,
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
