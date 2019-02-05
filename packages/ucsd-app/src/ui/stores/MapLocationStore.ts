import { action, computed } from 'mobx'
import { LatLng as LeafLatLng, LatLngBounds as LeafLatLngBounds, LatLngLiteral as LeafLatLngLiteral } from 'leaflet';
import { IGeocodeResponse } from '../services/GeocodingService';
import { IState } from '../state/State';


export class MapLocationStore {

    private state!: IState;

    constructor(state: IState) {
        this.state = state;
    }


    @computed get clickPos(): LeafLatLngLiteral | null {
        return this.state.mapExplorer.display.clickPos;
    }

    @computed get mousePos(): LeafLatLngLiteral | null {
        return this.state.mapExplorer.display.mousePos;
    }

    @computed get bounds(): LeafLatLngBounds | null {
        return this.state.mapExplorer.display.bounds;
    }


    @computed get zoom(): number {
        return this.state.mapExplorer.location.zoom;
    }

    @computed get center(): LeafLatLngLiteral {
        return this.state.mapExplorer.location.center;
    }

    @computed get selectedAddress(): IGeocodeResponse | null {
        return this.state.mapExplorer.address.selectedAddress;
    }


    @action
    updateCenter = (center: LeafLatLng, bounds: LeafLatLngBounds) => {
        this.state.mapExplorer.location.center = center;
        this.state.mapExplorer.display.bounds = bounds;
    }

    @action
    updateCore = (center: LeafLatLng, zoom: number, bounds: LeafLatLngBounds) => {
        // console.log('MapLocationStore.updateCore', this.bounds, this.mousePos)
        this.state.mapExplorer.location.center = center;
        this.state.mapExplorer.location.zoom = zoom;
        this.state.mapExplorer.display.bounds = bounds;
    }

    @action
    updateSelectedAddress = (newAddress: IGeocodeResponse) => {
        this.state.mapExplorer.address.selectedAddress = newAddress;
        this.state.mapExplorer.location.center = new LeafLatLng(parseFloat(newAddress.y), parseFloat(newAddress.x));
    }

    @action
    updateClickLocation = (latLng: LeafLatLng) => {
        this.state.mapExplorer.display.clickPos = latLng;
    }

    @action
    updateMousePosition = (latLng: LeafLatLng) => {
        // console.log('MapLocationStore.updateMousePosition()');
        // console.log('MapLocationStore.updateMousePosition() this.mousePos',this.mousePos);
        // console.log('MapLocationStore.updateMousePosition() latLng',latLng);
        this.state.mapExplorer.display.mousePos = latLng;
    }

}
