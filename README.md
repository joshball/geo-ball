# geo-ball

This is a multi-package repo for some mapping and graph algorithm fun projects.

I recall, back in the day, MIT had the [6.170 course](https://web.archive.org/web/20080320044845/http://www.mit.edu/~6.170/).

And then the University of Washington borrowed the course and implemented it in [CSE 331](https://courses.cs.washington.edu/courses/cse331/11wi/)

Finally, I saw a class on Coursera from UCSD [Advanced Data Structures in Java](https://www.coursera.org/learn/advanced-data-structures)

So, this is a repo for messing around with mapping and routing algs.
    

Grab this for turf and put in
https://github.com/Turfjs/turf/blob/master/packages/turf-point-to-line-distance/index.d.ts
node_modules\@turf\point-to-line-distance\index.d.ts
import { Coord, Feature, LineString, Units } from "@turf/helpers";
/**
 * Returns the minimum distance between a {@link Point} and a {@link LineString}, being the distance from a line the
 * minimum distance between the point and any segment of the `LineString`.
 *
 * @name pointToLineDistance
 * @param {Feature<Point>|Array<number>} pt Feature or Geometry
 * @param {Feature<LineString>} line GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] can be anything supported by turf/convertLength
 * (ex: degrees, radians, miles, or kilometers)
 * @param {string} [options.method="geodesic"] wether to calculate the distance based on geodesic (spheroid) or
 * planar (flat) method. Valid options are 'geodesic' or 'planar'.
 * @returns {number} distance between point and line
 * @example
 * var pt = turf.point([0, 0]);
 * var line = turf.lineString([[1, 1],[-1, 1]]);
 *
 * var distance = turf.pointToLineDistance(pt, line, {units: 'miles'});
 * //=69.11854715938406
 */
declare function pointToLineDistance(pt: Coord, line: Feature<LineString> | LineString, options?: {
    units?: Units;
    method?: "geodesic" | "planar";
}): number;
export default pointToLineDistance;
