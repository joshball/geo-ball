"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { fieldsHashCode, areEqual } from "prelude.ts";
exports.deg2rad = (degrees) => degrees * Math.PI / 180.0;
exports.degreesToRadians = (degrees) => degrees / 180.0 * Math.PI;
// export interface SerializedGeographicPoint {
//     lat: number;
//     lon: number;
// }
class GeographicPoint {
    constructor(latitude, longitude) {
        this.toString = () => `Lat: ${this.latitude}, Lon: ${this.longitude}`;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    // static Serialize(latitude: number, longitude: number): string {
    static Serialize(obj) {
        // const sgp: SerializedGeographicPoint = { lat: obj.latitude, lon: obj.longitude };
        return JSON.stringify(obj);
    }
    static DeSerialize(serializedGeoPoint) {
        // const serObj: SerializedGeographicPoint = JSON.parse(serializedGeoPoint);
        const serObj = JSON.parse(serializedGeoPoint);
        return new GeographicPoint(serObj.latitude, serObj.longitude);
    }
    equals(rhs) {
        if (!rhs) {
            return false;
        }
        // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
        return this.latitude === rhs.latitude && this.longitude === rhs.longitude;
    }
    hashCode() {
        return 1;
        // return fieldsHashCode(this.latitude, this.longitude);
    }
    /**
     * Calculates the geographic distance in km between this point and
     * the other point.
     * @param other
     * @return The distance between this lat, lon point and the other point
     */
    distance(other) {
        return this.getDist(this.latitude, this.longitude, other.latitude, other.longitude);
    }
    getDist(lat1, lon1, lat2, lon2) {
        const R = 6373; // radius of the earth in kilometres
        const lat1rad = exports.degreesToRadians(lat1);
        const lat2rad = exports.degreesToRadians(lat2);
        const deltaLat = exports.degreesToRadians(lat2 - lat1);
        const deltaLon = exports.degreesToRadians(lon2 - lon1);
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1rad) * Math.cos(lat2rad) *
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }
}
exports.GeographicPoint = GeographicPoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvZ3JhcGhpY1BvaW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvR2VvZ3JhcGhpY1BvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXlEO0FBQzVDLFFBQUEsT0FBTyxHQUFHLENBQUMsT0FBZSxFQUFVLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFDakUsUUFBQSxnQkFBZ0IsR0FBRyxDQUFDLE9BQWUsRUFBVSxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBRXZGLCtDQUErQztBQUMvQyxtQkFBbUI7QUFDbkIsbUJBQW1CO0FBQ25CLElBQUk7QUFFSixNQUFhLGVBQWU7SUFpQnhCLFlBQVksUUFBZ0IsRUFBRSxTQUFpQjtRQTZDL0MsYUFBUSxHQUFHLEdBQVcsRUFBRSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsVUFBVSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUE1Q3JFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFsQkQsa0VBQWtFO0lBQ2xFLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBb0I7UUFDakMsb0ZBQW9GO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBMEI7UUFDekMsNEVBQTRFO1FBQzVFLE1BQU0sTUFBTSxHQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBVUQsTUFBTSxDQUFDLEdBQW9CO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELDJGQUEyRjtRQUMzRixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDOUUsQ0FBQztJQUNELFFBQVE7UUFDSixPQUFPLENBQUMsQ0FBQztRQUNULHdEQUF3RDtJQUM1RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsS0FBc0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDN0MsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdELE9BQU8sQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZO1FBQzFELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLG9DQUFvQztRQUNwRCxNQUFNLE9BQU8sR0FBVyx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLE9BQU8sR0FBVyx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBVyx3QkFBZ0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxRQUFRLEdBQVcsd0JBQWdCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXZELE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsR0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakUsTUFBTSxDQUFDLEdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0EwQko7QUF0RkQsMENBc0ZDIn0=