import { OpenStreetMapTagObject } from "./OpenStreetMapTag";
import { IOpenStreetMapNode } from "./IOpenStreetMapNode";
import { IOpenStreetMapWay } from "./IOpenStreetMapWay";
import { IOpenStreetMapElementsStats } from "./IOpenStreetMapElementsStats";

export type OpenStreetMapsElementsArray = Array<IOpenStreetMapNode | IOpenStreetMapWay>;

export class OpenStreetMapElements {
	elements: Array<IOpenStreetMapNode | IOpenStreetMapWay>;

	constructor(elements: OpenStreetMapsElementsArray) {
		this.elements = elements;
	}
	
	getStats(): IOpenStreetMapElementsStats {
		return {
			elementCount: this.elements.length
		};
	}
}
