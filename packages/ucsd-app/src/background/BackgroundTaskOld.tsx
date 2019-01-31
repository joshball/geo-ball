import { ipcRenderer, remote, BrowserWindow } from 'electron';
import * as React from 'react';
import { Stats } from 'fs';
import { CHANNELS } from './index.old';


type State = Readonly<{
    progress: number;
    inProgress: boolean;
    computeDone: boolean;
    computeResult: string;
    stat: Stats | undefined;
}>;

class BackgroundTaskOld extends React.Component<{}, State> {
    readonly state: State = {
        progress: 0,
        inProgress: false,
        computeDone: false,
        computeResult: '',
        stat: undefined,
    };

    async componentDidMount() {
        console.log('BT.OLD.componentDidMount')
        // ipcRenderer.on('progress', this.onProgress);
    }

    componentWillUnmount() {
        console.log('BT.OLD.componentWillUnmount')
        // ipcRenderer.removeListener('progress', this.onProgress);
    }

    onProgress = (event: Event, progress: number) => {
        // console.log('BT.OLD.onProgress')
        this.setState({
            progress,
        });
    };

    sendCommand = async () => {
        console.log('BT.OLD.sendCommand')
        this.setState({
            inProgress: true,
            computeDone: false,
        });

        // This method will run synchronously, but in a background BrowserWindow process
        // so this browserWindow will not block
        // const t = console.time('BT.OLD.stat');


        // const ourId = remote.getCurrentWebContents().getOSProcessId();
        const wc = remote.getCurrentWebContents();
        const backgroundWindow = remote.getGlobal('backgroundWindow') as BrowserWindow;
        console.log('BT.OLD wc:', wc);
        console.log('BT.OLD backgroundWindow:', backgroundWindow);
        console.log('BT.OLD backgroundWindow.id:', backgroundWindow.id);

        console.log('BT.OLD ipcRender.on(BG.OLD.stat)');
        // ipcRenderer.on('UI.OLD.stat', (event: any, progress: number, stat: Stats) => {
        ipcRenderer.on(CHANNELS.OLD.retLstat, (event: any, progress: number, stat: Stats) => {
            if (true) {
                console.log('UI.OLD.stat RECEIVING event.senderId (BG.OLD):', event.senderId);
                console.log('UI.OLD.stat backgroundWindow.id (BG.OLD):', backgroundWindow.id);
                console.log('UI.OLD.stat progress:', progress);
                console.log('UI.OLD.stat stat:', stat);
            }
            this.setState({
                progress,
                inProgress: !stat,
                computeDone: !stat,
                computeResult: '',
                stat,
            });
            // console.timeEnd('BT.OLD.stat');
        });

        // const d = await bg.stat();

        console.log('backgroundWindow.id',backgroundWindow.id);
        console.log('wc.id',wc.id);
        console.log('@@@ BT.OLD bw.webContents.*SEND*(%s, id:%s, package.json)',CHANNELS.OLD.getLstat, wc.id);
        // backgroundWindow.webContents.send('BG.OLD.stat', wc.id, 'package.json')
        backgroundWindow.webContents.send(CHANNELS.OLD.getLstat, wc.id, 'package.json')
    };

    render() {
        console.log('BT.OLD.render')
        return (
            <div>
                <h1>Background Task Old</h1>
                <button onClick={this.sendCommand}>Compute Old School</button>
                {this.state.inProgress ? <div>Progress: {this.state.progress}</div> : null}
                {this.state.computeDone ? <div>Compute Result: {this.state.computeResult}</div> : null}
                {this.state.stat ? <pre>{JSON.stringify(this.state.stat, undefined, 4)}</pre> : null}
            </div>
        );
    }
}

export default BackgroundTaskOld;
