import * as React from 'react'
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../stores/RootStore';
import { join, basename, dirname, resolve } from 'path';
import { remote } from 'electron';
import { DataDirectorySettingsBoxComponent, DataDirectorySettingsBoxProps } from './DataDirectorySettingsBoxComponent';
import { IDataDirectory } from '../../models/DataDirectory';


export interface IValidateFolder {
    error: boolean;
    reason: string;
}

export interface DataDirectorySettingsProps {
    stores?: RootStore;
}

export interface DataDirectorySettingsState {
    dirName: string;
    rootPath: string;
    // dataDirectory: IDataDirectory;
}


@inject("stores")
@observer
export class DataDirectorySettingsComponent extends React.Component<DataDirectorySettingsProps, DataDirectorySettingsState> {

    state: DataDirectorySettingsState;

    originalDataDirectory: IDataDirectory;
    // dataDirectory: IDataDirectory;

    // originalDataDir: string;
    // originalUcsdDirRootPath: string;
    // originalUcsdDirName: string;

    constructor(props: DataDirectorySettingsProps) {
        super(props);

        // this.originalDataDir = this.props.stores!.data.getDataDirectoryPath();
        // this.originalUcsdDirName = basename(this.originalDataDir);
        // this.originalUcsdDirRootPath = dirname(this.originalDataDir)

        this.originalDataDirectory = this.props.stores!.settings.dataDirectory.getComponents();
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


    // async submitNewFolder(event: React.FormEvent): Promise<IValidateFolder> {
    //     event.preventDefault();
    //     console.log('submitNewFolder', event)
    //     return Promise.resolve({ error: false, reason: '' });
    //     // if (!this.state.managedDir) {
    //     //     console.log('BUGBUG: warn the user!')
    //     //     return;
    //     // }
    //     // this.props.stores!.data.setManagedDirectory(this.state.managedDir);
    // }

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
        this.props.stores!.settings.dataDirectory.dirName = this.state.dirName;
        this.props.stores!.settings.dataDirectory.rootPath = this.state.rootPath;
    }

    saveRequired() {
        console.log('this.originalDataDirectory.fullPath', this.originalDataDirectory.fullPath);
        console.log('this.originalDataDirectory.dirName', this.originalDataDirectory.dirName);
        console.log('this.originalDataDirectory.rootPath', this.originalDataDirectory.rootPath);
        console.log('  this.state.ucsdDirName', this.state.dirName);
        console.log('  this.state.ucsdDirRootPath', this.state.rootPath);
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
        const props: DataDirectorySettingsBoxProps = {
            ucsdDirName,
            ucsdDirRootPath,
            ucsdDirPath: join(ucsdDirRootPath, ucsdDirName),
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
            <DataDirectorySettingsBoxComponent {...props} />
        );
    }
}


