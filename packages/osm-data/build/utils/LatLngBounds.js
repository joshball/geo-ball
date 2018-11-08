"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LatLng_1 = require("./LatLng");
class LatLngBounds {
    constructor(southwest, northeast) {
        this.toString = () => `[SW:${this.sw}],[NE:${this.ne}]`;
        this.valid = () => this.sw.valid() && this.ne.valid();
        // console.log(`LatLngBounds(): ${southwest} ${northeast}`)
        const getError = (error) => `LatLngBounds() ${error} (maybe mixed up your ne/sw?)`;
        if (northeast.lat < southwest.lat) {
            throw new Error(getError(`ne.lat[${northeast.lat}] < sw.lat[${southwest.lat}]`));
        }
        if (northeast.lon < southwest.lon) {
            throw new Error(getError(`ne.lon[${northeast.lon}] < sw.lon[${southwest.lon}]`));
        }
        this.ne = new LatLng_1.LatLng(northeast.lat, northeast.lon);
        this.sw = new LatLng_1.LatLng(southwest.lat, southwest.lon);
    }
    grow(by) {
        this.ne.lat += by;
        this.sw.lat -= by;
        this.ne.lon += by;
        this.sw.lon -= by;
    }
    static FromBounds(bounds, growth = 0) {
        const sw = new LatLng_1.LatLng(bounds.sw.lat - growth, bounds.sw.lon - growth);
        const ne = new LatLng_1.LatLng(bounds.ne.lat + growth, bounds.ne.lon + growth);
        return new LatLngBounds(sw, ne);
    }
    static FromArray(bounds) {
        if (bounds.length !== 4) {
            throw new Error(`bounds array must be four elements (south[lat], west[lon], north[lat], east[lon])`);
        }
        const southLat = bounds[0];
        const westLon = bounds[1];
        const northLat = bounds[2];
        const eastLon = bounds[3];
        const sw = new LatLng_1.LatLng(southLat, westLon);
        const ne = new LatLng_1.LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }
    static FromNumbers(southLat, westLon, northLat, eastLon) {
        const sw = new LatLng_1.LatLng(southLat, westLon);
        const ne = new LatLng_1.LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }
    toArray() {
        return this.sw.toArray().concat(this.ne.toArray());
    }
}
exports.LatLngBounds = LatLngBounds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nQm91bmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0xhdExuZ0JvdW5kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFrQztBQUVsQyxNQUFhLFlBQVk7SUFJckIsWUFBWSxTQUFpQixFQUFFLFNBQWlCO1FBYWhELGFBQVEsR0FBRyxHQUFXLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFLFNBQVMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBd0MzRCxVQUFLLEdBQUcsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBcER0RCwyREFBMkQ7UUFDM0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixLQUFLLCtCQUErQixDQUFDO1FBQzNGLElBQUksU0FBUyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsU0FBUyxDQUFDLEdBQUcsY0FBYyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsSUFBSSxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxTQUFTLENBQUMsR0FBRyxjQUFjLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEY7UUFDRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUlELElBQUksQ0FBQyxFQUFVO1FBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQW9CLEVBQUUsU0FBaUIsQ0FBQztRQUN0RCxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDdEUsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQXFCO1FBQ2xDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtRkFBbUYsQ0FDdEYsQ0FBQztTQUNMO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFCLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxPQUFlO1FBQ25GLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBR0o7QUExREQsb0NBMERDIn0=