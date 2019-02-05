"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializedKeyMap_1 = require("../utils/SerializedKeyMap");
const geo_core_1 = require("@ball-maps/geo-core");
class IncomingAndOutgoingRoadSegments {
    constructor() {
        this.toString = () => `Outgoing: ${this.outgoing.length}, Incoming: ${this.incoming.length}`;
        this.dump = (tab = '    ') => {
            const dumpLine = (rli) => console.log(`${tab}  - RL: ${rli.name} => P1:[${rli.start}] P2:[${rli.end}]`);
            console.log(`${tab}RoadSegments: out: ${this.outgoing.length}, in: ${this.incoming.length}`);
            console.log(`${tab} OUTGOING:`);
            this.outgoing.forEach(dumpLine);
            console.log(`${tab} INCOMING:`);
            this.incoming.forEach(dumpLine);
        };
        this.incoming = [];
        this.outgoing = [];
    }
}
exports.IncomingAndOutgoingRoadSegments = IncomingAndOutgoingRoadSegments;
class PointsToRoadSegmentsMap {
    constructor() {
        this.toString = () => `PTRLMap has ${this.size} entries`;
        this.dump = (tab = '    ') => {
            console.log(`================================================================================`);
            console.log(`${tab}!DUMP! PointsToRoadSegmentsMap: has: ${this.size} entries:`);
            console.log(`================================================================================`);
            for (const [pointString, roadsInAndOut] of this._map.entries()) {
                console.log('POINT: ', pointString);
                roadsInAndOut.dump();
            }
            // console.log(`--------------------------------------------------------------------------------`);
            console.log(`================================================================================`);
        };
        this._map = new SerializedKeyMap_1.SerializedKeyMap(geo_core_1.LatLng.Serialize, geo_core_1.LatLng.DeSerialize);
        // console.log('PointsToRoadSegmentsMap._map.size', this._map.size)
    }
    serialize(pretty = false) {
        return this._map.serialize(pretty);
    }
    get(point) {
        return this._map.get(point);
    }
    get size() {
        return this._map.size;
    }
    entries() {
        return this._map.entries();
        // const a: GeographicPointRoadSegments = [];
        // for (const [pointString, roadsInAndOut] of this._map.entries()) {
        //     a.push([LatLng.DeSerialize(pointString), roadsInAndOut]);
        // }
        // return a;
    }
    set(point, ioRoadSegments) {
        return this._map.set(point, ioRoadSegments);
    }
    addToPointsMapOneWay(line) {
        // console.log('addToPointsMapOneWay.pointMap:', this._map)
        // console.log('addToPointsMapOneWay.line:', line)
        const ptOneInfos = this._getOrAddIoRoadSegments(line.start);
        ptOneInfos.outgoing.push(line);
        const ptTwoInfos = this._getOrAddIoRoadSegments(line.end);
        ptTwoInfos.incoming.push(line);
    }
    _getOrAddIoRoadSegments(point) {
        let ioRoadSegments = this.get(point);
        // console.log('-----')
        // console.log('MAP DUMP')
        // for (const [key, value] of this._map.entries()) {
        //     console.log(`   - ${key}: ${value.toString()}`);
        // }
        // console.log('  getOrAddIoRoadSegments.point: %s', point)
        // console.log('  getOrAddIoRoadSegments.ioRoadSegments: %s', ioRoadSegments)
        if (!ioRoadSegments) {
            // pt1Infos = new Array<Array<RoadSegmentLine>>();
            // ioRoadSegments = [[], []];
            ioRoadSegments = new IncomingAndOutgoingRoadSegments();
            // console.log('addToPointsMapOneWay.pt1Infos.n:', ioRoadSegments)
            this.set(point, ioRoadSegments);
        }
        return ioRoadSegments;
    }
}
exports.PointsToRoadSegmentsMap = PointsToRoadSegmentsMap;
//# sourceMappingURL=PointsToRoadSegmentsMap.js.map