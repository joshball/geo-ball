import { action } from 'mobx';
import { IState } from '../state/State';

export class CommonStore {
    state!: IState;

    constructor(state: IState) {
        this.state = state;
    }

    @action
    setTitle(newTitle: string) {
        this.state.common.title = newTitle;
    }
}
