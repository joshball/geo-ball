import { action, computed } from 'mobx';
import { IGeocodeResponse } from '../services/GeocodingService';
import { LatLngBounds, LatLng, ILatLng, ILatLngBounds } from '@geo-ball/geo-core';
import { State } from '../state/State';

export class MapLocationStore {
    private state!: State;

    constructor(state: State) {
        this.state = state;
    }

    @computed get clickPos(): ILatLng | null {
        return this.state.mapExplorer.display.clickPos;
    }

    @computed get mousePos(): ILatLng | null {
        return this.state.mapExplorer.display.mousePos;
    }

    @computed get bounds(): LatLngBounds | null {
        return this.state.mapExplorer.display.bounds;
    }

    @computed get zoom(): number {
        return this.state.mapExplorer.location.zoom;
    }

    @computed get center(): ILatLng {
        return this.state.mapExplorer.location.center;
    }

    @computed get selectedAddress(): IGeocodeResponse | null {
        return this.state.mapExplorer.address.selectedAddress;
    }

    @action
    updateCenter = (center: LatLng, bounds: LatLngBounds) => {
        this.state.mapExplorer.location.center = center;
        this.state.mapExplorer.display.bounds = bounds;
    };

    @action
    updateCore = (center: ILatLng, zoom: number, bounds: LatLngBounds) => {
        // console.log('MapLocationStore.updateCore', this.bounds, this.mousePos)
        this.state.mapExplorer.location.center = center;
        this.state.mapExplorer.location.zoom = zoom;
        this.state.mapExplorer.display.bounds = bounds;
    };

    @action
    updateSelectedAddress = (newAddress: IGeocodeResponse) => {
        this.state.mapExplorer.address.selectedAddress = newAddress;
        this.state.mapExplorer.location.center = new LatLng(
            parseFloat(newAddress.y),
            parseFloat(newAddress.x),
        );
    };

    @action
    updateClickLocation = (latLng: ILatLng) => {
        this.state.mapExplorer.display.clickPos = latLng;
    };

    @action
    updateMousePosition = (latLng: ILatLng) => {
        // console.log('MapLocationStore.updateMousePosition()');
        // console.log('MapLocationStore.updateMousePosition() this.mousePos',this.mousePos);
        // console.log('MapLocationStore.updateMousePosition() latLng',latLng);
        this.state.mapExplorer.display.mousePos = latLng;
    };
}
