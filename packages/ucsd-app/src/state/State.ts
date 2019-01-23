import { extendObservable, toJS, action } from 'mobx';
import { IMapLocationState, IMapExplorerState } from './IMapLocationState';
import { ICommonState } from './ICommonState';

export interface IState {
    common: ICommonState
    mapLocation: IMapLocationState
    mapExplorer: IMapExplorerState
}

export const defaultState: IState = {
    common: {
        title: 'Home',
    },
    mapLocation: {
        zoom: 19,
        center: {
            lat: 40.716847,
            lng: -111.850494,
        },
        clickPos: undefined,
        selectedAddress: undefined,
    },
    mapExplorer: {
        location: {
            zoom: 19,
            center: {
                lat: 40.716847,
                lng: -111.850494,
            }
        },
        display: {
            bounds: null,
            clickPos: null,
            mousePos: null,
        },
        address: {
            selectedAddress: null,
            geoSearchResults: [],
        },
    }

};

/**
 * This is our state, we update it
 * using the methods from other stores
 */
class State implements IState {
    common!: ICommonState;
    mapLocation!: IMapLocationState;
    mapExplorer!: IMapExplorerState;
    constructor(state?: IState | undefined) {
        const newState = { ...defaultState, ...state };
        extendObservable(this, newState);
    }
}

console.log('process.env.BROWSER', process.env.BROWSER);
console.log('window.__STATE  PRE:', (window as any).__STATE);
export default process.env.BROWSER ? (
    (window as any).__STATE = new State((window as any).__STATE)
) : new State();
console.log('window.__STATE POST:', (window as any).__STATE);
