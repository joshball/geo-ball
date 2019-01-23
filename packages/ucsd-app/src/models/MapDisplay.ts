
// import { action, computed, observable } from 'mobx'
// import { LatLng, LatLngBounds, LatLngLiteral, Map as LeafletMap } from 'leaflet';
// import { IGeoSearchResult } from '../services/IGeoSearchResult';
// import { MapLocationStore } from '../stores/MapLocationStore';


// export class MapDisplay {

//     mapStore: MapLocationStore;
//     leafletMap: LeafletMap;


//     constructor(mapStore: MapLocationStore, leafletMap: LeafletMap) {
//         this.mapStore = mapStore;
//         this.leafletMap = leafletMap;
//     }

//     @observable mousePos: LatLngLiteral | undefined;


//     @computed get zoom(): number {
//         return this.mapStore.zoom;
//     }

//     @computed get center(): LatLngLiteral {
//         return this.mapStore.center;
//     }

//     @computed get clickPos(): LatLngLiteral | undefined {
//         return this.mapStore.clickPos;
//     }

//     @computed get selectedAddress(): IGeoSearchResult | undefined {
//         return this.mapStore.selectedAddress;
//     }

//     @computed get bounds(): LatLngBounds {
//         return this.leafletMap.getBounds();
//     }


//     @action
//     updateCenter = (center: LatLng) => {
//         this.mapStore.updateCenter(center);
//     }

//     @action
//     updateCore = (center: LatLng, zoom: number) => {
//         this.mapStore.updateCore(center, zoom);
//     }

//     @action
//     updateSelectedAddress = (newAddress: IGeoSearchResult) => {
//         this.mapStore.updateSelectedAddress(newAddress);
//     }

//     @action
//     updateClickLocation = (latLng: LatLng) => {
//         this.mapStore.updateClickLocation(latLng);
//     }

//     @action
//     updateMousePosition = (latLng: LatLng) => {
//         this.mousePos = latLng;
//     }

// }
