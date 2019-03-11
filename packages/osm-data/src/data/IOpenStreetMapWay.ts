import { OpenStreetMapTagObject } from './OpenStreetMapTag';

/**
 * From: https://wiki.openstreetmap.org/wiki/Elements
 *
 * A way is an ordered list of between 2 and 2,000 nodes that define a polyline.
 * Ways are used to represent linear features such as rivers and roads.
 *
 * Ways can also represent the boundaries of areas (solid polygons) such as buildings
 * or forests. In this case, the way's first and last node will be the same.
 * This is called a "closed way".
 *
 * Note that closed ways occasionally represent loops, such as roundabouts on highways,
 * rather than solid areas. The way's tags must be examined to discover which it is.
 *
 * Areas with holes, or with boundaries of more than 2,000 nodes, cannot be represented
 * by a single way. Instead, the feature will require a more complex multipolygon
 * relation data structure.
 *
 *  More details: https://wiki.openstreetmap.org/wiki/Way
 */
export interface IOpenStreetMapWay {
    id: number;
    type: 'way';
    tags: OpenStreetMapTagObject;
    nodes?: Array<number>;
}
