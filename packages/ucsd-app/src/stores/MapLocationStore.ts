import { action, computed } from 'mobx'
import { LatLng, LatLngBounds, LatLngLiteral } from 'leaflet';
import { IGeoSearchResult } from '../services/IGeoSearchResult';
import { IState } from '../state/State';


export class MapLocationStore {

    private state!: IState;

    constructor(state: IState) {
        this.state = state;
    }


    @computed get clickPos(): LatLngLiteral | null {
        return this.state.mapExplorer.display.clickPos;
    }

    @computed get mousePos(): LatLngLiteral | null {
        return this.state.mapExplorer.display.mousePos;
    }

    @computed get bounds(): LatLngBounds | null {
        return this.state.mapExplorer.display.bounds;
    }


    @computed get zoom(): number {
        return this.state.mapExplorer.location.zoom;
    }

    @computed get center(): LatLngLiteral {
        return this.state.mapExplorer.location.center;
    }

    @computed get selectedAddress(): IGeoSearchResult | null {
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
    updateSelectedAddress = (newAddress: IGeoSearchResult) => {
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
