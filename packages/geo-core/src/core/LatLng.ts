export interface ILatLng {
    lat: number;
    lon: number;
}

export class LatLng {
    lat!: number;
    lon!: number;
    constructor(lat: number, lon: number) {
        // console.log('lat/lon', lat, lon)
        this.lat = lat;
        this.lon = lon;
    }
    static FromArray(latLngArray: Array<number>) {
        return new LatLng(latLngArray[0], latLngArray[1]);
    }
    toArray(): Array<number> {
        return [this.lat, this.lon];
    }

    toString = (): string => `Lat:${this.lat}, Lon:${this.lon}`;

    valid = (): boolean => this.lat >= -90 && this.lat <= 90 && this.lon >= -180 && this.lon <= 180;

    equals(rhs: ILatLng): boolean {
        if (!rhs) {
            return false;
        }
        // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
        return this.lat === rhs.lat && this.lon === rhs.lon;
    }

    hashCode(): number {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
    }


    /** Convenience methods for mapping later */
    static Serialize(latLngObj: ILatLng): string {
        return JSON.stringify(latLngObj);
    }

    /** Convenience methods for mapping later */
    static DeSerialize(serializedLatLng: string): LatLng {
        // const serObj: SerializedGeographicPoint = JSON.parse(serializedGeoPoint);
        const serObj: ILatLng = JSON.parse(serializedLatLng);
        return new LatLng(serObj.lat, serObj.lon);
    }
}
