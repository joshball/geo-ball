import { remote, BrowserWindow } from 'electron';
import * as React from 'react';
// import * as ipc from 'electron-better-ipc';
import ipc from './better-ipc';
import { Stats } from 'fs';
import { CHANNELS } from './index.new';
const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
console.log('backgroundWindow:', backgroundWindow);
if(!backgroundWindow){
    throw new Error('backgroundWindow global not set!');
}
type State = Readonly<{
    progress: number;
    inProgress: boolean;
    computeDone: boolean;
    computeResult: string;
    stat: Stats | undefined;
}>;

class BackgroundTaskNew extends React.Component<{}, State> {
    readonly state: State = {
        progress: 0,
        inProgress: false,
        computeDone: false,
        computeResult: '',
        stat: undefined,
    };

    async componentDidMount() {
        console.log('UI.NEW.componentDidMount')
        // ipcRenderer.on('progress', this.onProgress);
    }

    componentWillUnmount() {
        console.log('UI.NEW.componentWillUnmount')
        // ipcRenderer.removeListener('progress', this.onProgress);
    }

    onProgress = (event: Event, progress: number) => {
        console.log('### UI.NEW.onProgress')
        this.setState({
            progress,
        });
    };

    sendCommand = async () => {
        console.log('UI.NEW.sendCommand')
        this.setState({
            inProgress: true,
            computeDone: false,
        });

        // This method will run synchronously, but in a background BrowserWindow process
        // so this browserWindow will not block
        console.time('UI.NEW.compute');


        console.log('UI.NEW About to call BG.ipcRenderer(%s, %s, package.json)', backgroundWindow.id, CHANNELS.NEW.lstat);

        const stat = await ipc.callRender(backgroundWindow, CHANNELS.NEW.lstat, 'package.json');
        console.log('UI.NEW.ipcRenderer.stat', stat);

        // const d = await bg.compute();
        this.setState({
            progress: 0,
            inProgress: false,
            computeDone: true,
            computeResult: '',
            stat,
        });
        console.timeEnd('UI.NEW.compute');
    };

    render() {
        // console.log('UI.NEW.render')
        return (
            <div>
                <h1>Background Task New</h1>
                <button onClick={this.sendCommand}>Compute New School</button>
                {this.state.inProgress ? <div>Progress: {this.state.progress}</div> : null}
                {this.state.computeDone ? <div>Compute Result: {this.state.computeResult}</div> : null}
                {this.state.stat ? <pre>{JSON.stringify(this.state.stat, undefined, 4)}</pre> : null}
            </div>
        );
    }
}

export default BackgroundTaskNew;
