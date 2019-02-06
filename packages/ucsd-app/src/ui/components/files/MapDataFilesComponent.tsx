import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { FileListComponent } from './FileListComponent';
import { FileStorageService } from '../../services/FileStorageService';

import { OsmFetchGraphFilesSet, ReadDirCallback } from "@geo-ball/ucsd-core";
import { OsmFetchesListComponent } from './OsmFetchesListComponent';
import { SelectedFetchComponent } from './SelectedFetchComponent';
import { H5 } from '@blueprintjs/core';


const firstLayout = css({
    display: 'flex',
    flex: '1',
    margin: '10px',
    padding: '10px',
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
});

const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateAreas: 'osm rsd pmf int',
});



export interface MapDataFilesComponentProps {
    stores?: RootStore;
}
export interface MapDataFilesComponentState {
    osmFetchDirPath: string;
    allOsmFetchSets: Array<OsmFetchGraphFilesSet>;
    selectedFetch?: OsmFetchGraphFilesSet | undefined;
    error?: Error | undefined;
}

@inject("stores")
@observer
export class MapDataFilesComponent extends React.Component<MapDataFilesComponentProps, MapDataFilesComponentState> {


    state: MapDataFilesComponentState;

    constructor(props: MapDataFilesComponentProps) {
        super(props);
        const ucsdAppDataPath = this.props.stores!.settings.ucsdAppDataDirMgr.fullPath;
        const osmFetchDirPath = this.props.stores!.settings.ucsdAppDataDirMgr.osmFetchDirPath;

        this.state = { allOsmFetchSets: [], osmFetchDirPath };
        console.log('MapDataFilesComponent.refresh(): osmFetchDirPath', osmFetchDirPath)
        console.log('MapDataFilesComponent.refresh(): ucsdAppDataPath', ucsdAppDataPath)

        this.refreshFiles();
    }

    async refreshFiles(): Promise<void> {
        const readdirCallback: ReadDirCallback = (daPath: string) => FileStorageService.ReadDirWithFullPaths(daPath) as Promise<Array<string>>;


        // return createMapDataFileSetFromPath(ucsdOsmPath)
        return OsmFetchGraphFilesSet.GetAllFetchDirs(this.state.osmFetchDirPath, readdirCallback)
            .then(allOsmFetchSets => {

                console.log('*** fileSet', allOsmFetchSets);
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')

                return allOsmFetchSets;
            })
            .then(allOsmFetchSets => this.setState({ allOsmFetchSets }))
            .catch(error => {
                console.error('MapDataFilesComponent.refreshFiles createMapDataFileSetFromPath ERROR:', error);
                this.setState({ error })
            })
    }

    handleSearch = (e: any) => {
        e.preventDefault()
    }

    handleFetchClicked = (selectedFetch: OsmFetchGraphFilesSet) => {
        console.log('selectedFetch:', selectedFetch);
        this.setState({
            selectedFetch
        })
    }

    render() {
        const { allOsmFetchSets: fileSet, selectedFetch, osmFetchDirPath } = this.state;
        console.log('RENDER: MapDataFilesComponent.fileSet', fileSet)

        const { osmFiles, rsdFiles, intFiles, pmfFiles } = this.getFiles(fileSet);
        // console.log('RENDER: MapDataFilesComponent.osmFiles', osmFiles, rsdFiles, pmfFiles, intFiles)
        // console.log('RENDER: MapDataFilesComponent.rsdFiles', rsdFiles)
        // console.log('RENDER: MapDataFilesComponent.pmfFiles', pmfFiles)
        // console.log('RENDER: MapDataFilesComponent.intFiles', intFiles)
        return (
            <div>
                <div className={`${firstLayout}`}>
                    <H5>Data Fetch Directory:&nbsp;&nbsp;&nbsp;<code>{osmFetchDirPath}</code></H5>
                </div>
                <div className={`${firstLayout}`}>
                    <OsmFetchesListComponent fetches={fileSet} fetchClicked={this.handleFetchClicked} />
                </div >
                <SelectedFetchComponent fetch={selectedFetch} />
                <div className={`${mainLayout}`}>
                    {/* <FileListComponent files={osmFiles} title="OpenStreetMap Files" />
                    <FileListComponent files={rsdFiles} title="Road Segment Files" />
                    <FileListComponent files={pmfFiles} title="Point Map Files" />
                    <FileListComponent files={intFiles} title="Intersection Files" /> */}
                </div >
            </div >
        )
    }
    getFiles(fileSet: Array<OsmFetchGraphFilesSet>): any {
        const osmFiles: Array<string> = [];
        const rsdFiles: Array<string> = [];
        const intFiles: Array<string> = [];
        const pmfFiles: Array<string> = [];
        fileSet.forEach(f => console.log('fileSet.forEach', f));
        // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
        // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
        // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
        fileSet.forEach(f => osmFiles.push(f.osm.path || 'missing'));
        fileSet.forEach(f => rsdFiles.push(f.rsd.path || 'missing'));
        fileSet.forEach(f => intFiles.push(f.int.path || 'missing'));
        fileSet.forEach(f => pmfFiles.push(f.pmf.path || 'missing'));
        // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
        // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
        // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
        // fileSet.forEach(f => f.pmf.path ? pmfFiles.push(f.pmf.path) : 'missing');
        console.log('osmFiles:', osmFiles)
        return {
            osmFiles,
            rsdFiles,
            intFiles,
            pmfFiles,
        }
    }
}

