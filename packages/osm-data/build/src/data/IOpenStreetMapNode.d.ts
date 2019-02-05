import { OpenStreetMapTagObject } from "./OpenStreetMapTag";
export interface IOpenStreetMapNode {
    id: number;
    type: 'node';
    lat: number;
    lon: number;
    tags?: OpenStreetMapTagObject;
}
//# sourceMappingURL=IOpenStreetMapNode.d.ts.map