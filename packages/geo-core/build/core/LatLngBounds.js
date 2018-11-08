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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0TG5nQm91bmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvTGF0TG5nQm91bmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWtDO0FBRWxDLE1BQWEsWUFBWTtJQUlyQixZQUFZLFNBQWlCLEVBQUUsU0FBaUI7UUFhaEQsYUFBUSxHQUFHLEdBQVcsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsU0FBUyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7UUF3QzNELFVBQUssR0FBRyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFwRHRELDJEQUEyRDtRQUMzRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLEtBQUssK0JBQStCLENBQUM7UUFDM0YsSUFBSSxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxTQUFTLENBQUMsR0FBRyxjQUFjLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEY7UUFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLFNBQVMsQ0FBQyxHQUFHLGNBQWMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNwRjtRQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBSUQsSUFBSSxDQUFDLEVBQVU7UUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBb0IsRUFBRSxTQUFpQixDQUFDO1FBQ3RELE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUN0RSxNQUFNLEVBQUUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDdEUsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBcUI7UUFDbEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUNYLG1GQUFtRixDQUN0RixDQUFDO1NBQ0w7UUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFnQixFQUFFLE9BQWUsRUFBRSxRQUFnQixFQUFFLE9BQWU7UUFDbkYsTUFBTSxFQUFFLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxHQUFHLElBQUksZUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Q0FHSjtBQTFERCxvQ0EwREMifQ==