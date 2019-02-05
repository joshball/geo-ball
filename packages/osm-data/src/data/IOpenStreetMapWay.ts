import { OpenStreetMapTagObject } from "./OpenStreetMapTag";

export interface IOpenStreetMapWay {
    id: number;
    type: 'way';
    tags: OpenStreetMapTagObject;
    nodes?: Array<number>;
}
