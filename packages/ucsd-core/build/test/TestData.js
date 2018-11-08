"use strict";
// import { LatLngBounds, LatLng } from '@ball-maps/geo-core';
// import { OpenStreetmapQuery, LatLngBounds, LatLng } from "..";
// import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
// export interface ILatLngObj {
// 	lat: number;
// 	lon: number;
// };
// export interface ILatLngBoundsObj {
// 	sw: ILatLngObj;
// 	ne: ILatLngObj;
// };
// export interface ILatLngBoundsTestData {
// 	objBounds: ILatLngBoundsObj;
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
// 	const sw = new LatLng(objBounds.sw.lat, objBounds.sw.lon);
// 	const ne = new LatLng(objBounds.ne.lat, objBounds.ne.lon);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC9UZXN0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOERBQThEO0FBRTlELGlFQUFpRTtBQUNqRSxvRkFBb0Y7QUFFcEYsZ0NBQWdDO0FBQ2hDLGdCQUFnQjtBQUNoQixnQkFBZ0I7QUFDaEIsS0FBSztBQUNMLHNDQUFzQztBQUN0QyxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CLEtBQUs7QUFFTCwyQ0FBMkM7QUFDM0MsZ0NBQWdDO0FBQ2hDLGVBQWU7QUFDZixlQUFlO0FBQ2YsK0JBQStCO0FBQy9CLEtBQUs7QUFFTCwrQkFBK0I7QUFDL0IsOEJBQThCO0FBQzlCLGdEQUFnRDtBQUNoRCxLQUFLO0FBRUwsZ0VBQWdFO0FBQ2hFLHVCQUF1QjtBQUN2QixVQUFVO0FBQ1YscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1AsVUFBVTtBQUNWLHFCQUFxQjtBQUNyQixzQkFBc0I7QUFDdEIsTUFBTTtBQUNOLEtBQUs7QUFDTCw4REFBOEQ7QUFDOUQsOERBQThEO0FBQzlELGtEQUFrRDtBQUNsRCxZQUFZO0FBQ1osZUFBZTtBQUNmLFFBQVE7QUFDUixRQUFRO0FBQ1IsaUJBQWlCO0FBQ2pCLE1BQU07QUFDTixJQUFJO0FBRUosaUdBQWlHO0FBQ2pHLHFFQUFxRTtBQUNyRSw0RUFBNEU7QUFDNUUsWUFBWTtBQUNaLFdBQVc7QUFDWCx5QkFBeUI7QUFDekIsTUFBTTtBQUNOLEtBQUs7QUFHTCw4QkFBOEI7QUFHOUIsNERBQTREO0FBQzVELG1CQUFtQjtBQUNuQixrREFBa0Q7QUFDbEQsY0FBYztBQUNkLGtEQUFrRDtBQUNsRCw0SEFBNEg7QUFDNUgsTUFBTTtBQUNOLGlCQUFpQjtBQUNqQixNQUFNO0FBQ04scUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQix3QkFBd0I7QUFDeEIsMEJBQTBCO0FBQzFCLGVBQWU7QUFDZixtQ0FBbUM7QUFDbkMsT0FBTztBQUNQLE1BQU07QUFDTixLQUFLO0FBQ0wsS0FBSyJ9