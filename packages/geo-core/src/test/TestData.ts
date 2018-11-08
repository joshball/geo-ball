import { LatLngBounds, LatLng } from "..";

export interface ILatLngObj {
	lat: number;
	lon: number;
};
export interface ILatLngBoundsObj {
	sw: ILatLngObj;
	ne: ILatLngObj;
};

export interface ILatLngBoundsTestData {
	objBounds: ILatLngBoundsObj;
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
