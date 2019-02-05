import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { FileListComponent } from './FileListComponent';
import { FileStorageService } from '../../services/FileStorageService';
import { join } from 'path';

import { PointMapsFile, RoadSegmentsFile, IntersectionsFile } from "@geo-ball/ucsd-core";
import { OpenStreetmapFile } from "@geo-ball/osm-data";


const singleResultCss = css({
    border: '1px solid grey',
    marginTop: '10px',
    padding: '6px'
})


const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateAreas: 'osm rsd pmf int',
});

export interface IPathFileMap {
    path: string;
    file: any;
}

export interface IMapDataFileSetEx {
    runDirPath: string;
    osm: IPathFileMap;
    rsd: IPathFileMap;
    pmf: IPathFileMap;
    int: IPathFileMap;
    unknownPaths: Array<string>;
}
export interface IMapDataFileSet {
    path: string;
    osmPath: string | undefined;
    rsdPath: string | undefined;
    pmfPath: string | undefined;
    intPath: string | undefined;
    osm: OpenStreetmapFile | undefined;
    rsd: RoadSegmentsFile | undefined;
    pmf: PointMapsFile | undefined;
    int: IntersectionsFile | undefined;
    unknownPaths: Array<string>;
}

const getFileTypesFromArrayEx = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSetEx => {
    console.log('---------------------------------------------------------------')
    console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
    console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
    const mdf: IMapDataFileSetEx = {
        runDirPath: osmRunDirectoryPath,
        osm: handleIt(),
        rsd: {},
        pmf: {},
        int: {},
        unknownPaths: [],
    }
    const loadFiles = false;
    const handleIt = (path: string, extChecker: () => boolean, ) => {
        if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.osm) {
                throw new Error('Should only be one file in here');
            }
            mdf.osmPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
            }
        }

    }
    osmRunFilePaths.forEach(osmSingleRunFilePath => {
        console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
        mdf.osm = handleIt(osmSingleRunFilePath, OpenStreetmapFile.HasCorrectExtension, OpenStreetmapFile.Load);
        mdf.rsd = handleIt(osmSingleRunFilePath, RoadSegmentsFile.HasCorrectExtension, RoadSegmentsFile.Load);

        if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.osm) {
                throw new Error('Should only be one file in here');
            }
            mdf.osmPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
            }
        }

        else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.rsd) {
                throw new Error('Should only be one file in here');
            }
            mdf.rsdPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
            }
        }

        else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.pmf) {
                throw new Error('Should only be one file in here');
            }
            mdf.pmfPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
            }
        }

        else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.int) {
                throw new Error('Should only be one file in here');
            }
            mdf.intPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
            }
        }
        else {
            mdf.unknownPaths.push(osmSingleRunFilePath);
        }
    })
    return mdf;
}
const getFileTypesFromArray = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSet => {
    console.log('---------------------------------------------------------------')
    console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
    console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
    const mdf: IMapDataFileSet = {
        path: osmRunDirectoryPath,
        osm: undefined,
        osmPath: undefined,
        rsd: undefined,
        rsdPath: undefined,
        pmf: undefined,
        pmfPath: undefined,
        int: undefined,
        intPath: undefined,
        unknownPaths: [],
    }
    const loadFiles = false;
    const handleIt = (path: string, extChecker: () => boolean, ) => {
        if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.osm) {
                throw new Error('Should only be one file in here');
            }
            mdf.osmPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
            }
        }

    }
    osmRunFilePaths.forEach(osmSingleRunFilePath => {
        console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
        if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.osm) {
                throw new Error('Should only be one file in here');
            }
            mdf.osmPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
            }
        }

        else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.rsd) {
                throw new Error('Should only be one file in here');
            }
            mdf.rsdPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
            }
        }

        else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.pmf) {
                throw new Error('Should only be one file in here');
            }
            mdf.pmfPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
            }
        }

        else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            if (mdf.int) {
                throw new Error('Should only be one file in here');
            }
            mdf.intPath = osmSingleRunFilePath;
            if (loadFiles) {
                mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
            }
        }
        else {
            mdf.unknownPaths.push(osmSingleRunFilePath);
        }
    })
    return mdf;
}
const createMapDataFileSetFromPath = async (runPath: string): Promise<Array<IMapDataFileSet>> => {
    // const stat = await ipc.callRender(backgroundWindow, CHANNELS.lstat, 'package.json');

    // console.log('createMapDataFileSetFromPath: runPath', runPath)
    // const content = await FileStorageService.ReadDir(runPath) as Array<string>;
    // console.log('createMapDataFileSetFromPath: content', content)
    // console.log('createMapDataFileSetFromPath: content', content)
    // console.log('createMapDataFileSetFromPath: content', content)
    // console.log('createMapDataFileSetFromPath: content', content)

    console.log('###====================================================================================###')
    console.log('createMapDataFileSetFromPath.ReadDirWithFullPaths: runPath', runPath)
    console.log('###====================================================================================###')
    const osmRunDirs = await FileStorageService.ReadDirWithFullPaths(runPath) as Array<string>;
    console.log('###====================================================================================###')
    console.log('createMapDataFileSetFromPath: contents', osmRunDirs)
    console.log('###====================================================================================###')
    return Promise.all(osmRunDirs.map(osmRunDirPath => {
        return (FileStorageService.ReadDirWithFullPaths(osmRunDirPath) as Promise<Array<string>>)
            .then((osmRunFilePaths) => getFileTypesFromArray(osmRunDirPath, osmRunFilePaths))
            .catch(error => {
                console.error('createMapDataFileSetFromPath ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
                throw error;
            })

    }));
}


export interface MapDataFilesComponentProps {
    stores?: RootStore;
}
export interface MapDataFilesComponentState {
    fileSet: Array<IMapDataFileSet>;
    error?: Error | undefined;
}

@inject("stores")
@observer
export class MapDataFilesComponent extends React.Component<MapDataFilesComponentProps, MapDataFilesComponentState> {


    state: MapDataFilesComponentState;

    constructor(props: MapDataFilesComponentProps) {
        super(props);
        this.state = { fileSet: [] };

        this.refreshFiles();
    }

    async refreshFiles(): Promise<void> {
        const { ucsdOsmPath } = this.props.stores!.settings.dataDirectory;
        console.log('refreshFiles||| |MapDataFilesComponent.refresh: ucsdOsmPath', ucsdOsmPath)
        return createMapDataFileSetFromPath(ucsdOsmPath)
            .then(fileSet => {
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')

                console.log('*** fileSet', fileSet);
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')
                console.log('###====================================================================================###')

                return fileSet;
            })
            .then(fileSet => this.setState({ fileSet }))
            .then(fileSet => { console.log('*** DONE DONE DONE fileSet', fileSet); return fileSet; })
            .catch(error => {
                console.error('MapDataFilesComponent.refreshFiles createMapDataFileSetFromPath ERROR:', error);
                this.setState({ error })
            })
    }

    handleSearch = (e: any) => {
        e.preventDefault()
    }

    render() {
        const { fileSet } = this.state;
        console.log('RENDER: MapDataFilesComponent.fileSet', fileSet)

        const { osmFiles, rsdFiles, intFiles, pmfFiles } = this.getFiles(fileSet);
        console.log('RENDER: MapDataFilesComponent.osmFiles', osmFiles)
        console.log('RENDER: MapDataFilesComponent.rsdFiles', rsdFiles)
        console.log('RENDER: MapDataFilesComponent.pmfFiles', pmfFiles)
        console.log('RENDER: MapDataFilesComponent.intFiles', intFiles)
        return (
            <div className={`${mainLayout}`}>
                <FileListComponent files={osmFiles} title="OpenStreetMap Files" />
                <FileListComponent files={rsdFiles} title="Road Segment Files" />
                <FileListComponent files={pmfFiles} title="Point Map Files" />
                <FileListComponent files={intFiles} title="Intersection Files" />
            </div >
        )
    }
    getFiles(fileSet: IMapDataFileSet[]): any {
        const osmFiles: Array<string> = [];
        const rsdFiles: Array<string> = [];
        const intFiles: Array<string> = [];
        const pmfFiles: Array<string> = [];
        fileSet.forEach(f => console.log('fileSet.forEach', f));
        // fileSet.forEach(f => f.osmPath ? osmFiles.push(f.osmPath) : null);
        fileSet.forEach(f => {
            console.log('fileSet.forEach.osmPath', f.osmPath);
            return f.osmPath ? osmFiles.push(f.osmPath) : undefined
        });
        fileSet.forEach(f => f.rsdPath ? rsdFiles.push(f.rsdPath) : null);
        fileSet.forEach(f => f.intPath ? intFiles.push(f.intPath) : null);
        fileSet.forEach(f => f.pmfPath ? pmfFiles.push(f.pmfPath) : null);
        console.log('osmFiles:',osmFiles)
        return {
            osmFiles,
            rsdFiles,
            intFiles,
            pmfFiles,
        }
    }
}

