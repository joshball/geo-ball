import { IState } from '../state/State';
import { CommonStore } from "./CommonStore";
import { DataStore } from "./DataStore";
import { MapLocationStore } from "./MapLocationStore";

export class RootStore {
    common: CommonStore;
    data: DataStore;
    mapLocation: MapLocationStore;

    constructor(state: IState) {
        this.common = new CommonStore(state);
        this.data = new DataStore(state);
        this.mapLocation = new MapLocationStore(state);
    }
}
