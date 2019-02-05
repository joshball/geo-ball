import { IOpenStreetMapNode } from "./IOpenStreetMapNode";
import { IOpenStreetMapWay } from "./IOpenStreetMapWay";
import { IOpenStreetMapElementsStats } from "./IOpenStreetMapElementsStats";
export declare type OpenStreetMapsElementsArray = Array<IOpenStreetMapNode | IOpenStreetMapWay>;
export declare class OpenStreetMapElements {
    elements: Array<IOpenStreetMapNode | IOpenStreetMapWay>;
    constructor(elements: OpenStreetMapsElementsArray);
    getStats(): IOpenStreetMapElementsStats;
}
//# sourceMappingURL=OpenStreetMapElements.d.ts.map