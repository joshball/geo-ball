
import { action, computed } from 'mobx'
import { LatLng, LatLngBounds } from 'leaflet';
import { IGeoSearchResult } from '../pages/MapData/AddressSearchComponent';
import { IState } from '../state/State';
import { IMapState } from '../state/IMapState';


export class MapStore implements IMapState {
    state: IState;

    @computed get address(): IGeoSearchResult | undefined {
        return this.state.map.address;
    }
    @computed get updatingAddress(): IGeoSearchResult | undefined {
        return this.state.map.updatingAddress;
    }
    @computed get zoom(): number {
        return this.state.map.zoom;
    }
    @computed get mousePos() {
        return this.state.map.mousePos;
    }
    @computed get clickPos() {
        return this.state.map.clickPos;
    }
    @computed get center() {
        return this.state.map.center;
    }
    @computed get bounds(): LatLngBounds | [number, number][] | undefined {
        return this.state.map.bounds;
    }

    constructor(state: IState) {
        this.state = state;
    }

    @action
    updateAddress = (newAddress: IGeoSearchResult) => {
        console.log('MapState.updateAddress(newAddress) PRE: ', newAddress);
        // this.center!.lat = center.lat;
        // this.center!.lng = center.lng;
        this.state.map.address = newAddress;
        this.state.map.center = new LatLng(parseFloat(newAddress.y), parseFloat(newAddress.x));
    }

    @action
    update = (center: LatLng, bounds: LatLngBounds, zoom: number) => {
        // console.log('MapState.update(center,bounds,zoom) PRE: ', center, bounds, zoom);
        // this.center!.lat = center.lat;
        // this.center!.lng = center.lng;
        this.state.map.center = center;
        this.state.map.bounds = bounds;
        this.state.map.zoom = zoom;
        // console.log('MapState.update(center,bounds,zoom) POS: ', center, bounds, zoom);
    }

    @action
    updateMousePosition = (latLng: LatLng) => {
        this.state.map.mousePos = latLng;
    }

    @action
    updateClickLocation = (latLng: LatLng) => {
        this.state.map.clickPos = latLng;
    }

    @action
    setCenter = (latLng: LatLng) => {
        console.log('MapState.setCenter(latLng) PRE:', latLng, this.state.map.center!.toString());
        this.state.map.center!.lat = latLng.lat;
        this.state.map.center!.lng = latLng.lng;
        console.log('MapState.setCenter(latLng) POS:', latLng, this.state.map.center!.toString(), this);
    }

    @action
    setBounds = (bounds: LatLngBounds) => {
        console.log('MapState.setBounds(bounds) PRE:', bounds, this.state.map.bounds);
        this.state.map.bounds = bounds;
        console.log('MapState.setBounds(bounds) POS:', bounds, this.state.map.bounds);
    }

    @action
    setZoom = (zoom: number) => {
        console.log('MapState.setZoom(zoom) PRE:', zoom, this.state.map.zoom);
        this.state.map.zoom = zoom;
        console.log('MapState.setZoom(zoom) POS:', zoom, this.state.map.zoom);
    }
}
