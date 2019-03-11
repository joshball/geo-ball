import { PointsToRoadSegmentsMap } from './PointsToRoadSegmentsMap';
import { LatLng } from '@geo-ball/geo-core';
import { RoadSegmentLine } from './RoadSegmentLine';

export const findIntersections = (pointMap: PointsToRoadSegmentsMap): Array<LatLng> => {
    // List<GeographicPoint>
    // Now find the intersections.  These are roads that do not have
    // Exactly 1 or 2 roads coming in and out, where the roads in
    // match the roads out.
    // List<GeographicPoint> intersections = new LinkedList<LatLng>();
    const intersections: Array<LatLng> = [];

    for (const [point, roadsInAndOut] of pointMap.entries()) {
        // console.log('\nCHECKING INTERSECTION: point:', point.toString())
        // const roadsInAndOut = pointMap.get(pt); // List<LinkedList<RoadSegmentLine>>
        // const roadsOut = roadsInAndOut.get(0); // LinkedList<RoadSegmentLine>
        const roadsOut = roadsInAndOut.outgoing; // LinkedList<RoadSegmentLine>
        // const roadsIn = roadsInAndOut.get(1); // LinkedList<RoadSegmentLine>
        const roadsIn = roadsInAndOut.incoming; // LinkedList<RoadSegmentLine>

        let isNode = true;
        // console.log(`  INTERSECTION: IN(${roadsIn.length}) OUT(${roadsOut.length})`)

        if (roadsIn.length === 1 && roadsOut.length === 1) {
            // If these are the reverse of each other, then this is
            // and intersection (dead end)
            // console.log('  INTERSECTION: [IO=1]')
            if (
                !(
                    roadsIn[0].start.equals(roadsOut[0].end) &&
                    roadsIn[0].end.equals(roadsOut[0].start)
                ) &&
                roadsIn[0].name === roadsOut[0].name
            ) {
                isNode = false;
                // console.log('  INTERSECTION: [IO=1] DEAD END')
            } else {
                // console.log('  INTERSECTION: [IO=1] NOT a DEAD END')
            }
        } else if (roadsIn.length === 2 && roadsOut.length === 2) {
            // If all the road segments have the same name,
            // And there are two pairs of reversed nodes, then
            // this is not an intersection because the roads pass
            // through.
            // console.log('  INTERSECTION: [IO=2]')

            const name = roadsIn[0].name;
            let sameName = true;
            roadsIn.forEach((info: RoadSegmentLine) => {
                if (info.name !== name) {
                    sameName = false;
                }
            });
            roadsOut.forEach((info: RoadSegmentLine) => {
                if (info.name !== name) {
                    sameName = false;
                }
            });

            const in1: RoadSegmentLine = roadsIn[0];
            const in2: RoadSegmentLine = roadsIn[1];
            const out1: RoadSegmentLine = roadsOut[0];
            const out2: RoadSegmentLine = roadsOut[1];

            let passThrough = false;
            if (
                (in1.isReverse(out1) && in2.isReverse(out2)) ||
                (in1.isReverse(out2) && in2.isReverse(out1))
            ) {
                // console.log('  INTERSECTION: [IO=2] passThrough')
                passThrough = true;
            }

            if (sameName && passThrough) {
                // console.log('  INTERSECTION: [IO=2] passThrough AND sameName')
                isNode = false;
            }
        } else {
            // console.log('  INTERSECTION: [IO=*]')
        }
        if (isNode) {
            // console.log('  INTERSECTION: isNODE so adding to intersection')
            intersections.push(point);
        } else {
            // console.log('  INTERSECTION: is NOT NODE so NOT adding to intersection')
        }
    }
    return intersections;
};
