import { LatLngTuple } from 'leaflet';

export class MapLocation {
    name: string;
    center: [number, number];
    mapFile: string;
    constructor(name: string, center: LatLngTuple, mapFile: string) {
        this.name = name;
        this.center = center;
        this.mapFile = mapFile;
    }
}
