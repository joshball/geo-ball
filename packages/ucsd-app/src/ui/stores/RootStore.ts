import { IState } from '../state/State';
import { CommonStore } from "./CommonStore";
import { DataStore } from "./DataStore";
import { MapLocationStore } from "./MapLocationStore";
import { SettingsStore } from './SettingsStore';

export class RootStore {
    common: CommonStore;
    data: DataStore;
    settings: SettingsStore;
    mapLocation: MapLocationStore;
    services: IServices;

    constructor(state: IState) {
        this.common = new CommonStore(state);
        this.data = new DataStore(state);
        this.settings = new SettingsStore(state);
        this.mapLocation = new MapLocationStore(state);
    }
}
