import { ILatLngFmt, formatLatLng } from "./LatLngFmt";

export interface ILatLng {
    lat: number;
    lng: number;
}

export class LatLng {
    lat!: number;
    lng!: number;
    constructor(lat: number, lon: number) {
        // console.log('lat/lon', lat, lon)
        this.lat = lat;
        this.lng = lon;
    }

    static FromArray(latLngArray: Array<number>) {
        return new LatLng(latLngArray[0], latLngArray[1]);
    }

    toArray(): Array<number> {
        return [this.lat, this.lng];
    }

    toArrayLatLon(): Array<number> {
        return [this.lat, this.lng];
    }

    toArrayLonLat(): Array<number> {
        return [this.lng, this.lat];
    }

    toString = (): string => `Lat:${this.lat}, Lon:${this.lng}`;

    format = (llFmt: ILatLngFmt): string => formatLatLng(this.lat, this.lng, llFmt);

    valid = (): boolean => this.lat >= -90 && this.lat <= 90 && this.lng >= -180 && this.lng <= 180;

    precision = (): any => {
        const numDec = Math.min(countDecimalPlace(this.lat), countDecimalPlace(this.lng));
        return {
            decPlaces: numDec,
            precision: getPrecisionString(numDec)
        };
    }

    equals(rhs: ILatLng): boolean {
        if (!rhs) {
            return false;
        }
        // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
        return this.lat === rhs.lat && this.lng === rhs.lng;
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
        return new LatLng(serObj.lat, serObj.lng);
    }
}

const countDecimalPlace = (num: number): number => {
    const split = num.toString().split('.');
    if (split.length === 1) {
        return 0;
    }
    if (split.length === 2) {
        // console.log('split[1]', split[1], split[1].length)
        return split[1].length;
    }
    throw new Error('Bad lat/lng number!');
}

const decPrecision: any = {
    0: '111 km',
    1: '11.1 km',
    2: '1.11 km',
    3: '111 m',
    4: '11.1 m',
    5: '1.11 m',
    6: '0.111 m',
    7: '1.11 cm',
    8: '1.11 mm',
}
const getPrecisionString = (decPlaces: number): string => {
    if (decPlaces >= 0 && decPlaces <= 8) {
        return decPrecision[decPlaces];
    }
    if (decPlaces > 8) {
        return '< ' + decPrecision[8];
    }
    return 'Unknown precision';
}
// Lat Lng Precision:
// decimal  degrees    distance
// places
// -------------------------------
// 0        1.0        111 km
// 1        0.1        11.1 km
// 2        0.01       1.11 km
// 3        0.001      111 m
// 4        0.0001     11.1 m
// 5        0.00001    1.11 m
// 6        0.000001   0.111 m
// 7        0.0000001  1.11 cm
// 8        0.00000001 1.11 mm
// six decimals is only a foot off. Plenty for us!
