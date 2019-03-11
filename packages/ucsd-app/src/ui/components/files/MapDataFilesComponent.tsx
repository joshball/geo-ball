import * as React from 'react';
import { css } from 'glamor';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { FileListComponent } from './FileListComponent';
import { FileStorageService } from '../../services/FileStorageService';

import { OsmFetchManager, IOsmFetchManager } from '@geo-ball/ucsd-core';
import { OsmFetchesListComponent } from './OsmFetchesListComponent';
import { SelectedFetchComponent } from './SelectedFetchComponent';
import { H5 } from '@blueprintjs/core';
import { loadOsmFetchManager, getOsmFetchData } from '../../services/OsmService';
import { OsmFetchDir } from '../../../../../ucsd-core/src/files/fetch/OsmFetchDir';

const firstLayout = css({
    display: 'flex',
    flex: '1',
    margin: '10px',
    padding: '10px',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
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
    osmFetchMgr?: IOsmFetchManager | undefined;
    allOsmFetchDirs: Array<OsmFetchDir>;
    selectedFetchDir?: OsmFetchDir | undefined;
    // allOsmFetchSets: Array<OsmFetchGraphFilesSet>;
    // selectedFetch?: OsmFetchGraphFilesSet | undefined;
    error?: Error | undefined;
}

@inject('stores')
@observer
export class MapDataFilesComponent extends React.Component<
    MapDataFilesComponentProps,
    MapDataFilesComponentState
> {
    state: MapDataFilesComponentState;

    constructor(props: MapDataFilesComponentProps) {
        super(props);
        const ucsdAppDataPath = this.props.stores!.settings.ucsdAppDataDirMgr.fullPath;
        const osmFetchDirPath = this.props.stores!.settings.ucsdAppDataDirMgr.osmFetchDirPath;

        this.state = { allOsmFetchDirs: [], osmFetchDirPath };
        console.log('MapDataFilesComponent.refresh(): osmFetchDirPath', osmFetchDirPath);
        console.log('MapDataFilesComponent.refresh(): ucsdAppDataPath', ucsdAppDataPath);

        this.refreshFiles();
    }

    async refreshFiles(): Promise<void> {
        // const readdirCallback: ReadDirCallback = (daPath: string) => FileStorageService.ReadDirWithFullPaths(daPath) as Promise<Array<string>>;

        // return createMapDataFileSetFromPath(ucsdOsmPath)
        return getOsmFetchData(this.state.osmFetchDirPath)
            .then(osmFetchMgr => {
                console.log('*** osmFetchMgr', osmFetchMgr);
                console.log('*** osmFetchMgr', osmFetchMgr.osmFetchDirs);
                osmFetchMgr.osmFetchDirs.map(d => {
                    console.log(` ${d.fetchDirPath}:`);
                    d.subFiles.map(sd => console.log(`    - ${sd}`));
                });
                console.log(
                    '###====================================================================================###',
                );
                console.log(
                    '###====================================================================================###',
                );

                return osmFetchMgr;
            })
            .then(osmFetchMgr => this.setState({ osmFetchMgr }))
            .catch(error => {
                console.error(
                    'MapDataFilesComponent.refreshFiles loadOsmFetchManager ERROR:',
                    error.toString(),
                    error,
                );
                this.setState({ error });
            });

        // return loadOsmFetchManager(this.state.osmFetchDirPath)
        //     .then(osmFetchMgr => {

        //         console.log('*** osmFetchMgr', osmFetchMgr);
        //         console.log('*** osmFetchMgr', osmFetchMgr.osmFetchDirs);
        //         osmFetchMgr.osmFetchDirs.map(d => {
        //             console.log(` ${d.fetchDirPath}:`)
        //             d.subFiles.map(sd => console.log(`    - ${sd}`))
        //         })
        //         console.log('###====================================================================================###')
        //         console.log('###====================================================================================###')

        //         return osmFetchMgr;
        //     })
        //     .then(osmFetchMgr => this.setState({ osmFetchMgr }))
        //     .catch(error => {
        //         console.error('MapDataFilesComponent.refreshFiles loadOsmFetchManager ERROR:', error.toString(), error);
        //         this.setState({ error })
        //     })

        // return OsmFetchGraphFilesSet.GetAllFetchDirs(this.state.osmFetchDirPath, readdirCallback)
        //     .then(allOsmFetchSets => {

        //         console.log('*** fileSet', allOsmFetchSets);
        //         console.log('###====================================================================================###')
        //         console.log('###====================================================================================###')

        //         return allOsmFetchSets;
        //     })
        //     .then(allOsmFetchSets => this.setState({ allOsmFetchSets }))
        //     .catch(error => {
        //         console.error('MapDataFilesComponent.refreshFiles createMapDataFileSetFromPath ERROR:', error);
        //         this.setState({ error })
        //     })
    }

    handleSearch = (e: any) => {
        e.preventDefault();
    };

    handleFetchClicked = (selectedFetch: OsmFetchDir) => {
        console.log('selectedFetch:', selectedFetch);
        this.setState({
            selectedFetchDir: selectedFetch,
        });
    };

    render() {
        const { allOsmFetchDirs, selectedFetchDir, osmFetchDirPath, osmFetchMgr } = this.state;
        console.log('RENDER: MapDataFilesComponent.osmFetchDirPath', osmFetchDirPath);
        console.log('RENDER: MapDataFilesComponent.allOsmFetchDirs', allOsmFetchDirs);
        console.log('RENDER: MapDataFilesComponent.selectedFetchDir', selectedFetchDir);

        // const { osmFiles, rsdFiles, intFiles, pmfFiles } = this.getFiles(fileSet);
        // console.log('RENDER: MapDataFilesComponent.osmFiles', osmFiles, rsdFiles, pmfFiles, intFiles)
        // console.log('RENDER: MapDataFilesComponent.rsdFiles', rsdFiles)
        // console.log('RENDER: MapDataFilesComponent.pmfFiles', pmfFiles)
        // console.log('RENDER: MapDataFilesComponent.intFiles', intFiles)
        const osmFetchDirs = osmFetchMgr ? osmFetchMgr.osmFetchDirs : [];
        return (
            <div style={mainLayout}>
                <h1>MAP DATA FILES</h1>
                <div className={`${firstLayout}`}>
                    <H5>
                        Data Fetch Directory:&nbsp;&nbsp;&nbsp;<code>{osmFetchDirPath}</code>
                    </H5>
                </div>
                <div className={`${firstLayout}`}>
                    <OsmFetchesListComponent
                        fetches={osmFetchDirs}
                        fetchClicked={this.handleFetchClicked}
                    />
                    {/* <OsmFetchesListComponent fetches={allOsmFetchDirs} fetchClicked={this.handleFetchClicked} /> */}
                </div>
                <SelectedFetchComponent fetch={selectedFetchDir} />
                <div className={`${mainLayout}`}>
                    {/* <FileListComponent files={osmFiles} title="OpenStreetMap Files" />
                    <FileListComponent files={rsdFiles} title="Road Segment Files" />
                    <FileListComponent files={pmfFiles} title="Point Map Files" />
                    <FileListComponent files={intFiles} title="Intersection Files" /> */}
                </div>
            </div>
        );
    }
    // getFiles(fileSet: Array<OsmFetchDir>): any {
    //     const osmFiles: Array<string> = [];
    //     const rsdFiles: Array<string> = [];
    //     const intFiles: Array<string> = [];
    //     const pmfFiles: Array<string> = [];
    //     fileSet.forEach(f => console.log('fileSet.forEach', f));
    //     // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
    //     // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
    //     // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
    //     fileSet.forEach(f => osmFiles.push(f.osm.path || 'missing'));
    //     fileSet.forEach(f => rsdFiles.push(f.rsd.path || 'missing'));
    //     fileSet.forEach(f => intFiles.push(f.int.path || 'missing'));
    //     fileSet.forEach(f => pmfFiles.push(f.pmf.path || 'missing'));
    //     // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
    //     // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
    //     // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
    //     // fileSet.forEach(f => f.pmf.path ? pmfFiles.push(f.pmf.path) : 'missing');
    //     console.log('osmFiles:', osmFiles)
    //     return {
    //         osmFiles,
    //         rsdFiles,
    //         intFiles,
    //         pmfFiles,
    //     }
    // }
    // getFiles(fileSet: Array<OsmFetchGraphFilesSet>): any {
    //     const osmFiles: Array<string> = [];
    //     const rsdFiles: Array<string> = [];
    //     const intFiles: Array<string> = [];
    //     const pmfFiles: Array<string> = [];
    //     fileSet.forEach(f => console.log('fileSet.forEach', f));
    //     // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
    //     // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
    //     // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
    //     fileSet.forEach(f => osmFiles.push(f.osm.path || 'missing'));
    //     fileSet.forEach(f => rsdFiles.push(f.rsd.path || 'missing'));
    //     fileSet.forEach(f => intFiles.push(f.int.path || 'missing'));
    //     fileSet.forEach(f => pmfFiles.push(f.pmf.path || 'missing'));
    //     // fileSet.forEach(f => f.osm.path ? osmFiles.push(f.osm.path) : 'missing');
    //     // fileSet.forEach(f => f.rsd.path ? rsdFiles.push(f.rsd.path) : 'missing');
    //     // fileSet.forEach(f => f.int.path ? intFiles.push(f.int.path) : 'missing');
    //     // fileSet.forEach(f => f.pmf.path ? pmfFiles.push(f.pmf.path) : 'missing');
    //     console.log('osmFiles:', osmFiles)
    //     return {
    //         osmFiles,
    //         rsdFiles,
    //         intFiles,
    //         pmfFiles,
    //     }
    // }
}
