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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvTGF0TG5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxNQUFNO0lBR2YsWUFBWSxHQUFXLEVBQUUsR0FBVztRQVdwQyxhQUFRLEdBQUcsR0FBVyxFQUFFLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1RCxVQUFLLEdBQUcsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1FBWDVGLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQTBCO1FBQ3ZDLE9BQU8sSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FHSjtBQWhCRCx3QkFnQkMifQ==