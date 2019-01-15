import { LatLngBounds, LatLng } from "..";

export interface ILatLng {
	lat: number;
	lon: number;
};
export interface ILatLngBound {
	sw: ILatLng;
	ne: ILatLng;
};

export interface ILatLngBoundsTestData {
	objBounds: ILatLngBound;
	sw: LatLng;
	ne: LatLng;
	latLngBounds: LatLngBounds;
};

export const createNewBounds = (): ILatLngBoundsTestData => {
	const objBounds = {
		sw: {
			lat: 32.859375,
			lon: -117.27233,
		},
		ne: {
			lat: 32.902622,
			lon: -117.20367,
		}
	}
	const sw = new LatLng(objBounds.sw.lat, objBounds.sw.lon);
	const ne = new LatLng(objBounds.ne.lat, objBounds.ne.lon);
	const latLngBounds = new LatLngBounds(sw, ne);
	return {
		objBounds,
		sw,
		ne,
		latLngBounds
	};
}
