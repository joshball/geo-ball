import { extendObservable } from 'mobx';
import { IMapExplorerState, MapExplorerState } from './MapExplorerState';
import { ICommonState } from './ICommonState';
import { IDataState, DataState } from './DataState';

export interface IState {
    common: ICommonState;
    data: IDataState;
    mapExplorer: IMapExplorerState;
}

export const defaultState: IState = {
    common: {
        title: 'Home',
    },
    data: new DataState(),
    mapExplorer: new MapExplorerState(),
};

/**
 * This is our state, we update it
 * using the methods from other stores
 */
export class State implements IState {
    common!: ICommonState;
    data!: DataState;
    mapExplorer!: MapExplorerState;
    constructor(state?: IState | undefined) {
        const newState = { ...defaultState, ...state };
        extendObservable(this, newState);
    }
}

// console.log('process.env.BROWSER', process.env.BROWSER);
// console.log('window.__STATE  PRE:', (window as any).__STATE);
export default (process.env.BROWSER
    ? ((window as any).__STATE = new State((window as any).__STATE))
    : new State());
// console.log('window.__STATE POST:', (window as any).__STATE);
