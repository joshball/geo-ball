import { LatLngBounds, LatLng, ILatLngBounds } from "..";

export interface ILatLngBoundsTestData {
	objBounds: ILatLngBounds;
	sw: LatLng;
	ne: LatLng;
	latLngBounds: LatLngBounds;
};

export const createNewBounds = (): ILatLngBoundsTestData => {
	const objBounds = {
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
