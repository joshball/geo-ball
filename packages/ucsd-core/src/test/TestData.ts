// import { LatLngBounds, LatLng } from '@geo-ball/geo-core';

// import { OpenStreetmapQuery, LatLngBounds, LatLng } from "..";
// import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";

// export interface ILatLng {
// 	lat: number;
// 	lon: number;
// };
// export interface ILatLngBound {
// 	sw: ILatLng;
// 	ne: ILatLng;
// };

// export interface ILatLngBoundsTestData {
// 	objBounds: ILatLngBound;
// 	sw: LatLng;
// 	ne: LatLng;
// 	latLngBounds: LatLngBounds;
// };

// export interface IOsmQuery {
// 	query: OpenStreetmapQuery;
// 	latLngBoundsTestData: ILatLngBoundsTestData;
// };

// export const createNewBounds = (): ILatLngBoundsTestData => {
// 	const objBounds = {
// 		sw: {
// 			lat: 32.859375,
// 			lon: -117.27233,
// 		},
// 		ne: {
// 			lat: 32.902622,
// 			lon: -117.20367,
// 		}
// 	}
// 	const sw = new LatLng(objBounds.sw.lat, objBounds.sw.lng);
// 	const ne = new LatLng(objBounds.ne.lat, objBounds.ne.lng);
// 	const latLngBounds = new LatLngBounds(sw, ne);
// 	return {
// 		objBounds,
// 		sw,
// 		ne,
// 		latLngBounds
// 	};
// }

// export const createNewOpenStreetmapQuery = (latLngBoundsTestData?: ILatLngBoundsTestData) => {
// 	latLngBoundsTestData = latLngBoundsTestData || createNewBounds();
// 	const query = new OpenStreetmapQuery(latLngBoundsTestData.latLngBounds);
// 	return {
// 		query,
// 		latLngBoundsTestData
// 	};
// };

// export const dataDir = '.';

// export const osmJsonResp: IOpenStreetmapQueryResponse = {
// 	"version": 0.6,
// 	"generator": "Overpass API 0.7.55.4 3079d8ea",
// 	"osm3s": {
// 		"timestamp_osm_base": "2018-10-23T19:14:02Z",
// 		"copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
// 	},
// 	"elements": [
// 		{
// 			"type": "node",
// 			"id": 83550018,
// 			"lat": 40.7192445,
// 			"lon": -111.8535611,
// 			"tags": {
// 				"highway": "traffic_signals"
// 			}
// 		}
// 	]
// };
