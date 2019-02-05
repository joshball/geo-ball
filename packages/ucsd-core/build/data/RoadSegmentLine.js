"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@ball-maps/geo-core");
/**
 * THe RoadSegementLine is used for parsing a RoadSegments file which
 */
class RoadSegmentLine {
    constructor(start, end, name, type, maxSpeed = '', lanes = '') {
        this.start = start;
        this.end = end;
        this.name = name;
        this.type = type;
        this.maxSpeed = maxSpeed;
        this.lanes = lanes;
    }
    /**
     * Return true if this road is the same segment as other, but in reverse
     *   Otherwise return false.
     */
    isReverse(other) {
        return this.start.equals(other.end) && this.end.equals(other.start) &&
            this.name === other.name && this.type === other.type;
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
//# sourceMappingURL=RoadSegmentLine.js.map