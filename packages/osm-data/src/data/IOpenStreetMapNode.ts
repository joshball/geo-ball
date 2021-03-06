import { OpenStreetMapTagObject } from "./OpenStreetMapTag";

/**
 * From: https://wiki.openstreetmap.org/wiki/Elements
 *
 * A node represents a specific point on the earth's surface defined by its
 * latitude and longitude. Each node comprises at least an id number and a
 * pair of coordinates.
 *
 * Nodes can be used to define standalone point features. For example, a node
 * could represent a park bench or a water well.
 *
 * Nodes are also used to define the shape of a way. When used as points along
 * ways, nodes usually have no tags, though some of them could.
 * For example, highway=traffic_signals marks traffic signals on a road,
 * and power=tower represents a pylon along an electric power line.
 *
 * A node can be included as member of relation. The relation also may indicate
 * the member's role:
 * that is, the node's function in this particular set of related data elements.
 *
 * More details: https://wiki.openstreetmap.org/wiki/Node
 */
export interface IOpenStreetMapNode {
	id: number;
	type: 'node';
	lat: number;
	lon: number;
	tags?: OpenStreetMapTagObject;
}
