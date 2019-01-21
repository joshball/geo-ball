import { extendObservable, toJS, action } from 'mobx';
import { IMapState } from './IMapState';
import { ICommonState } from './ICommonState';

export interface IState {
    common: ICommonState
    map: IMapState
}

export const defaultState: IState = {

    common: {
        title: 'Home',
    },
    map: {
        address: undefined,
        updatingAddress: undefined,
        zoom: 19,
        mousePos: undefined,
        clickPos: undefined,
        center: {
            lat: 40.716847,
            lng: -111.850494,
        },
        bounds: undefined
    }
};

/**
 * This is our state, we update it
 * using the methods from other stores
 */
class State implements IState {
    common!: ICommonState;
    map!: IMapState;
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
