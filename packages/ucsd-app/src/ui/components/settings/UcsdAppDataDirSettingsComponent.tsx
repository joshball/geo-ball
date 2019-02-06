import * as React from 'react'
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { join, basename, dirname, resolve } from 'path';
import { remote } from 'electron';
import { UcsdAppDataDirSettingsBoxComponent, UcsdAppDataDirSettingsBoxProps } from './UcsdAppDataDirSettingsBoxComponent';
import { IUcsdAppDataDirMgr } from '../../models/UcsdAppDataDirMgr';


export interface IValidateFolder {
    error: boolean;
    reason: string;
}

export interface UcsdAppDataDirSettingsProps {
    stores?: RootStore;
}

export interface UcsdAppDataDirSettingsState {
    dirName: string;
    rootPath: string;
    // dataDirectory: IDataDirectory;
}


@inject("stores")
@observer
export class UcsdAppDataDirSettingsComponent extends React.Component<UcsdAppDataDirSettingsProps, UcsdAppDataDirSettingsState> {

    state: UcsdAppDataDirSettingsState;

    originalDataDirectory: IUcsdAppDataDirMgr;
    // dataDirectory: IDataDirectory;

    // originalDataDir: string;
    // originalUcsdDirRootPath: string;
    // originalUcsdDirName: string;

    constructor(props: UcsdAppDataDirSettingsProps) {
        super(props);

        // this.originalDataDir = this.props.stores!.data.getDataDirectoryPath();
        // this.originalUcsdDirName = basename(this.originalDataDir);
        // this.originalUcsdDirRootPath = dirname(this.originalDataDir)

        this.originalDataDirectory = this.props.stores!.settings.ucsdAppDataDirMgr.getComponents();
        // this.dataDirectory = this.props.stores!.settings.dataDirectory.getComponents();

        this.state = {
            dirName: this.originalDataDirectory.dirName,
            rootPath: this.originalDataDirectory.rootPath,
            // dataDirectory: this.props.stores!.settings.dataDirectory.getComponents(),
        };

        this.setRootPathToUsersHomeDir = this.setRootPathToUsersHomeDir.bind(this);
        this.setRootPathToAppUsersDir = this.setRootPathToAppUsersDir.bind(this);

        this.validateStateSettings = this.validateStateSettings.bind(this);


        // FORM BUTTONS
        this.clickSave = this.clickSave.bind(this);
        this.clickCancel = this.clickCancel.bind(this);
        this.saveRequired = this.saveRequired.bind(this);


        this.onFileInputDirectorySelected = this.onFileInputDirectorySelected.bind(this);
    }

    async setDirName(dirName: string) {
        console.log('setDirName', dirName);
        // this.dataDirectory.rootPath = rootPath
        this.setState({
            dirName
        });
    }

    async setRootPathToDir(rootPath: string) {
        console.log('setRootPathToDir', rootPath);
        this.setState({
            rootPath
        });
    }

    async validateStateSettings(): Promise<IValidateFolder> {
        return Promise.resolve({ error: false, reason: '' });
    }


    async setFolderBrowse(event: any): Promise<IValidateFolder> {
        event.preventDefault();
        this.setRootPathToDir(event.target.value);
        return Promise.resolve({ error: false, reason: '' });
    }


    // ================================================================================



    async resetSettings() {
        this.setRootPathToDir(this.originalDataDirectory.rootPath);
        this.setDirName(this.originalDataDirectory.dirName);
    }

    async setRootPathToUsersHomeDir() {
        const homeDir = remote.app.getPath('home');
        console.log('setRootPathToUsersHomeDir', homeDir)
        this.setRootPathToDir(homeDir);
    }

    async setRootPathToAppUsersDir() {
        const userDataDir = remote.app.getPath('userData');
        console.log('setRootPathToAppUsersDir', userDataDir)
        this.setRootPathToDir(userDataDir);
    }


    // ================================================================================


    async clickCancel(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        console.log('clickCancel', event)
        this.resetSettings();
    }
    async clickSave(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        console.log('clickSave', event)
        // TODO: offer to create if doesn't exist
        // handle permissions
        this.validateStateSettings();
        this.props.stores!.settings.ucsdAppDataDirMgr.dirName = this.state.dirName;
        this.props.stores!.settings.ucsdAppDataDirMgr.rootPath = this.state.rootPath;
    }

    saveRequired() {
        console.log('this.originalDataDirectory.fullPath', this.originalDataDirectory.fullPath);
        console.log('this.originalDataDirectory.dirName', this.originalDataDirectory.dirName);
        console.log('this.originalDataDirectory.rootPath', this.originalDataDirectory.rootPath);
        console.log('  this.state.dirName', this.state.dirName);
        console.log('  this.state.rootPath', this.state.rootPath);
        return this.originalDataDirectory.dirName !== this.state.dirName || this.originalDataDirectory.rootPath !== this.state.rootPath;
    }

    // ================================================================================

    /**
     * Callback for selecting a input[file] directory.
     * @param file An HTML File Element
     */
    async onFileInputDirectorySelected(file: File): Promise<void> {
        console.log('DataDirectorySettings.onFileInputDirectorySelected(file)', file)
        this.setRootPathToDir(file.path);
    }


    render() {
        const { dirName: ucsdDirName, rootPath: ucsdDirRootPath } = this.state;
        const saveRequired = this.saveRequired();
        // const defaultText = 'Select the root folder for your your files...'
        // const managedRootDirTxt = selectedFolder ? dirname(selectedFolder) : 'NONE SELECTED';
        // const managedDataDirTxt = selectedFolder || 'NONE SELECTED';
        const props: UcsdAppDataDirSettingsBoxProps = {
            geoballDirName: ucsdDirName,
            geoballDirRootPath: ucsdDirRootPath,
            geoballDirPath: join(ucsdDirRootPath, ucsdDirName),
            setFolderBrowse: this.setFolderBrowse,
            setFolderHome: this.setRootPathToUsersHomeDir,
            setFolderAppUserData: this.setRootPathToAppUsersDir,
            onFileInputDirectorySelected: this.onFileInputDirectorySelected,
            saveRequired,
            clickCancel: this.clickCancel,
            clickSave: this.clickSave,
            // decorateSelectedFolder: this.decorateSelectedFolder,
            // validateFolder: this.validateFolder,
            // submitNewFolder: this.submitNewFolder,
        }

        return (
            <UcsdAppDataDirSettingsBoxComponent {...props} />
        );
    }
}


