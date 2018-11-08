"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LatLng {
    constructor(lat, lon) {
        this.toString = () => `Lat:${this.lat}, Lon:${this.lon}`;
        this.valid = () => this.lat >= -90 && this.lat <= 90 && this.lon >= -180 && this.lon <= 180;
        // console.log('lat/lon', lat, lon)
        this.lat = lat;
        this.lon = lon;
    }
    static FromArray(latLngArray) {
        return new LatLng(latLngArray[0], latLngArray[1]);
    }
    toArray() {
        return [this.lat, this.lon];
    }
}
exports.LatLng = LatLng;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0xhdExuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsTUFBTTtJQUdmLFlBQVksR0FBVyxFQUFFLEdBQVc7UUFXcEMsYUFBUSxHQUFHLEdBQVcsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUQsVUFBSyxHQUFHLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQVg1RixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUEwQjtRQUN2QyxPQUFPLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsT0FBTztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBR0o7QUFoQkQsd0JBZ0JDIn0=