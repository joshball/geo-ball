import { autorun, observable } from "mobx";
import { IState } from '../state/State';
import { CommonStore } from "./CommonStore";
import { MapStore } from "./MapStore";

export class RootStore {
    common: CommonStore;
    map: MapStore;

    constructor(state: IState) {
        this.common = new CommonStore(state);
        this.map = new MapStore(state);
    }
}
