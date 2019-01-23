
// import { action, extendObservable } from 'mobx'
// import { LatLng, LatLngBounds, LatLngLiteral } from 'leaflet';
// // import { RootStore } from './index';
// import { IMapLocationState } from '../state/IMapLocationState';
// import { IGeoSearchResult } from '../services/IGeoSearchResult';


// export class MapState {
//     // @observable address!: string;
//     // @observable zoom!: number;
//     // @observable center!: LatLng;
//     // @observable bounds!: LatLngBounds;
//     address!: IGeoSearchResult;
//     zoom!: number;
//     mousePos!: LatLngLiteral;
//     clickPos!: LatLngLiteral;
//     center!: LatLngLiteral;
//     bounds!: LatLngBounds;

//     constructor(state?: IMapLocationState|undefined) {

//         extendObservable(this, {
//             address: undefined,
//             zoom: 19,
//             mousePos: undefined,
//             clickPos: undefined,
//             center: new LatLng(40.716847, -111.850494),
//             // bounds: new LatLngBounds(new LatLng(40, -111), new LatLng(40, -111)),
//             bounds: undefined
//         }, state as any);

//         // this.address = '';
//         // this.zoom = 17;
//         // this.center = observable(new LatLng(40.7563038, -111.8781928));
//         // // extendObservable(this.center, new LatLng(40.7563038, -111.8781928));
//         // this.bounds = new LatLngBounds(new LatLng(40.7563038, -111.8781928), new LatLng(40.7563038, -111.8781928));
//         // // this.center = new LatLng(40, -111);
//         // // this.bounds = new LatLngBounds(new LatLng(40, -111), new LatLng(40, -111));
//     }

//     // @action
//     // changeIt = () => {
//     //     console.log('MapState.changeIt() PRE:', this.center!.toString());
//     //     this.center!.lat -= 1;
//     //     this.center!.lng -= 1;
//     //     this.zoom! -= 1;
//     //     const swBound: LatLng = new LatLng(40.7, -111.7);
//     //     const neBound: LatLng = new LatLng(40.8, -111.8);
//     //     // const startingCenter: LatLngTuple = [40.7563038, -111.8781928];
//     //     const startingCenter: LatLng = new LatLng(40.7563038, -111.8781928);
//     //     const startingBounds: LatLngBounds = new LatLngBounds(swBound, neBound);
//     //     this.bounds = startingBounds;
//     //     console.log('MapState.changeIt() POS:', this.center!.toString(), this);
//     // }


//     @action
//     updateAddress = (newAddress: IGeoSearchResult) => {
//         console.log('MapState.updateAddress(newAddress) PRE: ', newAddress);
//         // this.center!.lat = center.lat;
//         // this.center!.lng = center.lng;
//         this.address = newAddress;
//         this.center=new LatLng(parseFloat(newAddress.y), parseFloat(newAddress.x));
//     }

//     @action
//     update = (center: LatLng, bounds: LatLngBounds, zoom: number) => {
//         // console.log('MapState.update(center,bounds,zoom) PRE: ', center, bounds, zoom);
//         // this.center!.lat = center.lat;
//         // this.center!.lng = center.lng;
//         this.center = center;
//         this.bounds = bounds;
//         this.zoom = zoom;
//         // console.log('MapState.update(center,bounds,zoom) POS: ', center, bounds, zoom);
//     }

//     @action
//     updateMousePosition = (latLng: LatLng) => {
//         this.mousePos = latLng;
//     }

//     @action
//     updateClickLocation = (latLng: LatLng) => {
//         this.clickPos = latLng;
//     }

//     @action
//     setCenter = (latLng: LatLng) => {
//         console.log('MapState.setCenter(latLng) PRE:', latLng, this.center!.toString());
//         this.center!.lat = latLng.lat;
//         this.center!.lng = latLng.lng;
//         console.log('MapState.setCenter(latLng) POS:', latLng, this.center!.toString(), this);
//     }

//     @action
//     setBounds = (bounds: LatLngBounds) => {
//         console.log('MapState.setBounds(bounds) PRE:', bounds, this.bounds);
//         this.bounds = bounds;
//         console.log('MapState.setBounds(bounds) POS:', bounds, this.bounds);
//     }

//     @action
//     setZoom = (zoom: number) => {
//         console.log('MapState.setZoom(zoom) PRE:', zoom, this.zoom);
//         this.zoom = zoom;
//         console.log('MapState.setZoom(zoom) POS:', zoom, this.zoom);
//     }
// }

// // export class MapStore {

// //     rootStore: RootStore;
// //     @observable mapState: MapState;

// //     constructor(rootStore: RootStore) {
// //         this.rootStore = rootStore
// //         this.mapState = new MapState();
// //     }

// //     @action
// //     doIt() {
// //         this.mapState.changeIt();
// //     }
// //     // // Search
// //     // @observable search = ''
// //     // @observable results = []
// //     // @observable selection = 0


// //     // // HTML
// //     // @observable height = window.innerHeight
// //     // @observable width = window.innerWidth

// //     // // Map
// //     // @observable zoom = 12
// //     // @observable lat = 43.650128
// //     // @observable lng = -79.382185
// //     // @observable bearing = 0.0
// //     // @observable pitch = 0.0
// //     // @observable style = 1
// //     // @observable mapId = 'map'
// //     // @observable token = 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ'

// //     // styleTable = {
// //     //     1: 'mapbox://styles/addxy/ciq40e6zx0010bkmbbo513b6s',
// //     //     2: 'mapbox://styles/mapbox/outdoors-v9',
// //     //     3: 'mapbox://styles/mapbox/satellite-streets-v9'
// //     // }

// //     // tiel = '#4AC7B0'
// //     // grey = '#494141'
// //     // salmon = '#FB7461'
// //     // lightGrey = '#E6E6DD'
// //     // mediumGrey = '#B9BDB1'
// //     // lightBlue = '#ACC6CB'

// //     // constructor() {
// //     //     window.addEventListener('resize', this.listenerResize.bind(this))
// //     // }

// //     // @computed get styleMax() {
// //     //     return Object.keys(this.styleTable).length
// //     // }

// //     // @computed get isXs() {
// //     //     return this.width < 768
// //     // }

// //     // listenerResize(e: any) {
// //     //     this.height = window.innerHeight
// //     //     this.width = window.innerWidth
// //     // }
// // }
