"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@ball-maps/geo-core");
/**
 * THe RoadSegementLine is used for parsing a RoadSegments file which
 */
class RoadSegmentLine {
    constructor(start, end, name, type) {
        this.start = start;
        this.end = end;
        this.name = name;
        this.type = type;
    }
    static CreateFromString(input) {
        const { startLat, startLon, endLat, endLon, roadName, roadType } = RoadSegmentLine.ParseLineIntoArray(input);
        const start = new geo_core_1.LatLng(startLat, startLon);
        const end = new geo_core_1.LatLng(endLat, endLon);
        return new RoadSegmentLine(start, end, roadName, roadType);
    }
    static ParseLineIntoArray(input) {
        const tokSplitter = RegExp(/([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+"([^"]*)"\s+(\w+)/g);
        const m = tokSplitter.exec(input);
        // console.log(JSON.stringify(m, undefined, 4));
        // console.log('match length:', m && m.length)
        // console.log('match:', m)
        if (!m || m.length !== 11) {
            console.log('match length should be 11');
            console.log('match input', input);
            console.log('match length:', m && m.length);
            console.log('match:', m);
            throw new Error(`match length should be 11 for line: [${input}]`);
        }
        const startLat = parseFloat(m[1]);
        const startLon = parseFloat(m[3]);
        const endLat = parseFloat(m[5]);
        const endLon = parseFloat(m[7]);
        const roadName = m[9];
        const roadType = m[10];
        return { startLat, startLon, endLat, endLon, roadName, roadType };
    }
}
// used to weed out 6 items, plus 5 spaces?
RoadSegmentLine.MinLineLength = 11;
exports.RoadSegmentLine = RoadSegmentLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9hZFNlZ21lbnRMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvUm9hZFNlZ21lbnRMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQTJEO0FBRTNEOztHQUVHO0FBQ0gsTUFBYSxlQUFlO0lBTTNCLFlBQVksS0FBYSxFQUFFLEdBQVcsRUFBRSxJQUFZLEVBQUUsSUFBcUI7UUFDMUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBTUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQWE7UUFDcEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdHLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBYTtRQUN0QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsb0dBQW9HLENBQUMsQ0FBQztRQUNqSSxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLGdEQUFnRDtRQUNoRCw4Q0FBOEM7UUFDOUMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsS0FBSyxHQUFHLENBQUMsQ0FBQTtTQUNqRTtRQUNELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ25FLENBQUM7O0FBL0JELDJDQUEyQztBQUNwQyw2QkFBYSxHQUFXLEVBQUUsQ0FBQztBQWZuQywwQ0E4Q0MifQ==