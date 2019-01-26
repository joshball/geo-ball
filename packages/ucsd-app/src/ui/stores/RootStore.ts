import { autorun, observable } from "mobx";
import { IState } from '../state/State';
import { CommonStore } from "./CommonStore";
import { MapLocationStore } from "./MapLocationStore";

export class RootStore {
    common: CommonStore;
    mapLocation: MapLocationStore;

    constructor(state: IState) {
        this.common = new CommonStore(state);
        this.mapLocation = new MapLocationStore(state);
    }
}
