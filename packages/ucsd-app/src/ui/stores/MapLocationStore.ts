import { action, computed } from 'mobx'
import { IGeocodeResponse } from '../services/GeocodingService';
import { IState } from '../state/State';
import { LatLngBounds, LatLng, ILatLng } from '@geo-ball/geo-core';


export class MapLocationStore {

    private state!: IState;

    constructor(state: IState) {
        this.state = state;
    }


    @computed get clickPos(): LatLng | null {
        return this.state.mapExplorer.display.clickPos;
    }

    @computed get mousePos(): LatLng | null {
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
    }

    @action
    updateCore = (center: LatLng, zoom: number, bounds: LatLngBounds) => {
        // console.log('MapLocationStore.updateCore', this.bounds, this.mousePos)
        this.state.mapExplorer.location.center = center;
        this.state.mapExplorer.location.zoom = zoom;
        this.state.mapExplorer.display.bounds = bounds;
    }

    @action
    updateSelectedAddress = (newAddress: IGeocodeResponse) => {
        this.state.mapExplorer.address.selectedAddress = newAddress;
        this.state.mapExplorer.location.center = new LatLng(parseFloat(newAddress.y), parseFloat(newAddress.x));
    }

    @action
    updateClickLocation = (latLng: LatLng) => {
        this.state.mapExplorer.display.clickPos = latLng;
    }

    @action
    updateMousePosition = (latLng: LatLng) => {
        // console.log('MapLocationStore.updateMousePosition()');
        // console.log('MapLocationStore.updateMousePosition() this.mousePos',this.mousePos);
        // console.log('MapLocationStore.updateMousePosition() latLng',latLng);
        this.state.mapExplorer.display.mousePos = latLng;
    }

}
