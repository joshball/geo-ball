import { LatLngBounds, LatLng, ILatLngBounds } from "..";

export interface ILatLngBoundsTestData {
	objBounds: ILatLngBounds;
	sw: LatLng;
	ne: LatLng;
	latLngBounds: LatLngBounds;
};

export const createNewBounds = (): ILatLngBoundsTestData => {
	const objBounds = {
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
