import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';

import { OsmFetchManager, IOsmFetchManager, OsmFetchDir, IOsmFetchFileMeta, IOsmFetchDir } from "@geo-ball/ucsd-core";
import { OsmFetchesListComponent } from './OsmFetchesListComponent';
import { SelectedFetchComponent } from './SelectedFetchComponent';
import { H5 } from '@blueprintjs/core';
import { getOsmFetchData } from '../../services/OsmService';


interface OsmOtherFilesComponentProps {
    files: Array<string>
}

export const OsmOtherFilesComponent: React.SFC<OsmOtherFilesComponentProps> = (props: OsmOtherFilesComponentProps) => (
    <div>
        <h1>Other Files</h1>
        <div>
            {props.files.map((f) => <div>{f} - <button>Delete</button></div>)}
        </div>

    </div>
)

interface OsmFetchesComponentProps {
    fetches: Array<IOsmFetchDir>
}

export const OsmFetchesComponent: React.SFC<OsmFetchesComponentProps> = (props: OsmFetchesComponentProps) => {
    console.log('OsmFetchesComponent fetches', props.fetches)
    const fetches = props.fetches ? props.fetches.map((f,i) => <div key={i}>{f.dirName}</div>) : 'NONE';
    return <div>
        <h1>All Downloads</h1>
        <div>
            {fetches}
        </div>
    </div>
}

interface OsmFetchComponentProps {
    fetch: IOsmFetchDir
}


export const OsmFetchComponent: React.SFC<OsmFetchComponentProps> = (props: OsmFetchComponentProps) => {
    const osmPath = props.fetch.osm ? props.fetch.osm.path : 'Missing';
    const intPath = props.fetch.int ? props.fetch.int.path : 'Missing';
    const rsdPath = props.fetch.rsd ? props.fetch.rsd.path : 'Missing';
    const pmfPath = props.fetch.pmf ? props.fetch.pmf.path : 'Missing';
    const otherDivs = props.fetch.unknownPaths.map((f) => <div>{f}</div>);
    const others = otherDivs.length ? <div><h3>Others</h3><div>{otherDivs}</div></div> : null;
    return <div>
        <h1>Single Fetch: {props.fetch.fetchLocalDateTime.toString()}</h1>
        <div><label>OSM:</label>{osmPath}</div>
        <div><label>RSD:</label>{rsdPath}</div>
        <div><label>PMF:</label>{pmfPath}</div>
        <div><label>INT:</label>{intPath}</div>
        {others}
    </div>;
}

interface OsmFileDetailComponentProps {
    name: string;
    type: string;
    size: number;
}

export const OsmFileDetailComponent: React.SFC<OsmFileDetailComponentProps> = (props: OsmFileDetailComponentProps) => (
    <div>
        <h1>File Details</h1>
        <h3>Name: {props.name}</h3>
        <h3>Type: {props.type}</h3>
        <h3>Size: {props.size}</h3>
        // if NOT OSM
        <button>Delete</button>
        <button>Rebuild</button>
    </div>
)

interface OsmQueryDetailComponentProps {
    name: string;
    bounds: string;
}

export const OsmQueryDetailComponent: React.SFC<OsmQueryDetailComponentProps> = (props: OsmQueryDetailComponentProps) => (
    <div>
        <h1>Query Details</h1>
        <h3>Name: {props.name}</h3>
        <h3>Bounds: {props.bounds}</h3>
        <button>Run Again</button>
        <button>Rebuild</button>
    </div>
)


const menuBarHeight = 50;
const mainMargin = 30;
const subtractPixels = menuBarHeight + 2 * mainMargin;

const blackCss = css({ background: 'black' })
const greenCss = css({ background: '#8BC34A' })
const blueCss = css({ background: '#00BCD4' })
const orangeCss = css({ background: '#FF9800' })

const blockCss = css({ display: 'block' })

const fullHeightCss = css({ height: `calc(100vh - ${subtractPixels}px)` })
const height100Css = css({ height: '100%' })

const boxCss = css(blockCss, height100Css, { padding: '15px' })

const fullPageGridCss = css({ display: 'grid', gridTemplateColumns: '300px 1fr', width: '100%' }, fullHeightCss)
const mainContainerGridCss = css({ display: 'grid', gridTemplateRows: '60% 40%', width: '100%' }, fullHeightCss)

export interface OsmFetchManagerComponentProps {
    stores?: RootStore;
}

// export interface OsmFetchManagerComponentState {
//     osmFetchDirPath: string;
//     osmFetchMgr?: IOsmFetchManager | undefined;
//     allOsmFetchDirs: Array<OsmFetchDir>;
//     selectedFetchDir?: OsmFetchDir | undefined;
//     // allOsmFetchSets: Array<OsmFetchGraphFilesSet>;
//     // selectedFetch?: OsmFetchGraphFilesSet | undefined;
//     error?: Error | undefined;
// }

export interface OsmFetchManagerViewProps {
    stores?: RootStore;
    osmFetchDirPath: string;
    allOsmFetchDirs: Array<IOsmFetchDir>;
    selectedFetchDir?: OsmFetchDir | undefined;
    selectedFile?: IOsmFetchFileMeta | undefined;
}
export interface OsmFetchManagerComponentState {
    osmFetchDirPath: string;
    allOsmFetchDirs: Array<IOsmFetchDir>;
    selectedFetchDir?: OsmFetchDir | undefined;
    selectedFile?: IOsmFetchFileMeta | undefined;
    // allOsmFetchSets: Array<OsmFetchGraphFilesSet>;
    // selectedFetch?: OsmFetchGraphFilesSet | undefined;
    error?: Error | undefined;
}

export const OsmFetchManagerView: React.SFC<OsmFetchManagerViewProps> = (props: OsmFetchManagerViewProps) => {
    console.log('OsmFetchManagerComponent');
    const runDetailComponent = <h1>Run Detail</h1>;
    const fileDetailComponent = <h1>File Detail</h1>;
    // const allRunsComponent = <h1>All Runs</h1>;
    // const fileDetailComponent = <OsmFetchComponent fetch={{}} />;
    const allRunsComponent = <OsmFetchesComponent fetches={props.allOsmFetchDirs} />;

    const mainTopDetailDiv = <div {...css(boxCss, orangeCss)}>{runDetailComponent}</div>
    const mainBottomDetailDiv = <div {...css(boxCss, blueCss)}>{fileDetailComponent}</div>
    const mainContentDiv = <div {...css(mainContainerGridCss)}>{mainTopDetailDiv}{mainBottomDetailDiv}</div>
    const leftSideDiv = <div {...css(boxCss, greenCss)}>{allRunsComponent}</div>
    const fullContentDiv = <div {...css(fullPageGridCss)}>{leftSideDiv}{mainContentDiv}</div>
    return fullContentDiv;

}


@inject("stores")
@observer
export class OsmFetchManagerComponent extends React.Component<OsmFetchManagerComponentProps, OsmFetchManagerComponentState> {
    state: OsmFetchManagerComponentState;

    constructor(props: OsmFetchManagerComponentProps) {
        super(props);
        const ucsdAppDataPath = this.props.stores!.settings.ucsdAppDataDirMgr.fullPath;
        const osmFetchDirPath = this.props.stores!.settings.ucsdAppDataDirMgr.osmFetchDirPath;

        this.state = { allOsmFetchDirs: [], osmFetchDirPath };
        this.refreshFiles();
    }
    async refreshFiles(): Promise<void> {
        return getOsmFetchData(this.state.osmFetchDirPath)
            .then(osmFetchMgr => {
                const allOsmFetchDirs = osmFetchMgr.osmFetchDirs;
                this.setState({ allOsmFetchDirs })
                // osmFetchMgr.osmFetchDirs.map(d => {
                //     console.log(` ${d.fetchDirPath}:`)
                //     d.subFiles.map(sd => console.log(`    - ${sd}`))
                // })
                // return osmFetchMgr;
            })
            // .then(osmFetchMgr => this.setState({ osmFetchMgr }))
            .catch(error => {
                console.error('MapDataFilesComponent.refreshFiles loadOsmFetchManager ERROR:', error.toString(), error);
                this.setState({ error })
            })
    }
    render() {
        // const { fetch, fetches, file } = this.state;
        return <OsmFetchManagerView {...this.state} />
        // console.log('OsmFetchManagerComponent');
        // const runDetailComponent = <h1>Run Detail</h1>;
        // const fileDetailComponent = <h1>File Detail</h1>;
        // // const allRunsComponent = <h1>All Runs</h1>;
        // const fileDetailComponent = <OsmFetchComponent fetch={{}} />;
        // const allRunsComponent = <OsmFetchesComponent fetches={[]} />;

        // const mainTopDetailDiv = <div {...css(boxCss, orangeCss)}>{runDetailComponent}</div>
        // const mainBottomDetailDiv = <div {...css(boxCss, blueCss)}>{fileDetailComponent}</div>
        // const mainContentDiv = <div {...css(mainContainerGridCss)}>{mainTopDetailDiv}{mainBottomDetailDiv}</div>
        // const leftSideDiv = <div {...css(boxCss, greenCss)}>{allRunsComponent}</div>
        // const fullContentDiv = <div {...css(fullPageGridCss)}>{leftSideDiv}{mainContentDiv}</div>
        // return fullContentDiv;
    }

}

