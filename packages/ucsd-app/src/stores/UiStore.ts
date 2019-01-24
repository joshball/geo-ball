// import { observable, computed } from 'mobx'
// import {RootStore} from './index';

// export class AddressSearch {
//     @observable address:string|undefined;
//     @observable zoom:number;
//     @observable center:LatLng|undefined;
//     @observable bounds:LatLngBounds|undefined;
//     constructor(){
//         // this.address = '';
//         this.zoom = 17;
//         this.center = new LatLng(40.7563038, -111.8781928);
//         // this.bounds = '';
//     }
// }

// export class UiStore {

//     rootStore: RootStore;
//     addressSearch: AddressSearch;

//     constructor(rootStore: RootStore) {
//         this.rootStore = rootStore
//         this.addressSearch = new AddressSearch();
//     }

//     // // Search
//     // @observable search = ''
//     // @observable results = []
//     // @observable selection = 0


//     // // HTML
//     // @observable height = window.innerHeight
//     // @observable width = window.innerWidth

//     // // Map
//     // @observable zoom = 12
//     // @observable lat = 43.650128
//     // @observable lng = -79.382185
//     // @observable bearing = 0.0
//     // @observable pitch = 0.0
//     // @observable style = 1
//     // @observable mapId = 'map'
//     // @observable token = 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ'

//     // styleTable = {
//     //     1: 'mapbox://styles/addxy/ciq40e6zx0010bkmbbo513b6s',
//     //     2: 'mapbox://styles/mapbox/outdoors-v9',
//     //     3: 'mapbox://styles/mapbox/satellite-streets-v9'
//     // }

//     // tiel = '#4AC7B0'
//     // grey = '#494141'
//     // salmon = '#FB7461'
//     // lightGrey = '#E6E6DD'
//     // mediumGrey = '#B9BDB1'
//     // lightBlue = '#ACC6CB'

//     // constructor() {
//     //     window.addEventListener('resize', this.listenerResize.bind(this))
//     // }

//     // @computed get styleMax() {
//     //     return Object.keys(this.styleTable).length
//     // }

//     // @computed get isXs() {
//     //     return this.width < 768
//     // }

//     // listenerResize(e: any) {
//     //     this.height = window.innerHeight
//     //     this.width = window.innerWidth
//     // }
// }

