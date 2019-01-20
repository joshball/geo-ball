// import { autorun, observable } from "mobx";
// import { UiStore } from "./UiStore";
// import { MapStore } from './MapStore';
// export * from './UiStore';
// export * from './MapStore';

// export class RootStore {
//     @observable uiStore: UiStore;
//     @observable mapStore: MapStore;

//     constructor() {
//         this.uiStore = new UiStore(this)
//         this.mapStore = new MapStore(this)
//     }
// }

// const store = new RootStore();
// autorun(() => console.log('AUTORUN RootStore.mapStore.mapState [bounds,center]:', store.mapStore.mapState.bounds, store.mapStore.mapState.center))
// export default store;
