import * as React from 'react'
import { observer } from 'mobx-react';
import { FileInput } from '@blueprintjs/core';


export interface IValidateFolder {
    error: boolean;
    reason: string;
}

export interface FolderSelectorComponentProps {
    defaultText?: string;
    selectedFolder?: string;
    decorateSelectedFolder: (path: string) => string;
    validateFolder: (path: string) => Promise<IValidateFolder>;
    submitNewFolder: (path: string) => Promise<IValidateFolder>;
}

export interface FolderSelectorComponentState {
    selectedFolder: string | undefined;
}

@observer
export class FolderSelectorComponent extends React.Component<FolderSelectorComponentProps, FolderSelectorComponentState> {

    state: FolderSelectorComponentState;

    constructor(props: FolderSelectorComponentProps) {
        super(props);
        this.state = {
            selectedFolder: this.props.selectedFolder
        };
        this.handleManualEntry = this.handleManualEntry.bind(this);
        this.handleFolderBrowser = this.handleFolderBrowser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSelectedFolderValidation(valid: IValidateFolder, selectedFolder: string) {
        if (!valid.error) {
            this.setState({
                selectedFolder
            });
        }
        else {
            console.log('show error:', valid.reason);
        }
    }
    async handleManualEntry(event: any) {
        event.preventDefault();
        this.setFolder(event.target.value);
    }

    async handleFolderBrowser(event: any) {
        event.preventDefault();
        this.setFolder(event.target.value);
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        const folder = event.target.value;
        this.setFolder(folder);
        const valid = await this.props.submitNewFolder(folder);
        this.handleSelectedFolderValidation(valid, folder);
    }

    async setFolder(folder: string) {
        const valid = await this.props.validateFolder(folder);
        this.handleSelectedFolderValidation(valid, folder);
    }

    render() {
        const { selectedFolder } = this.state;
        const inputProps = { webkitdirectory: 'true' };
        const text = selectedFolder
            ? selectedFolder
            : this.props.defaultText || 'Choose a folder';
        return (
            <form onSubmit={this.handleSubmit}>
                <FileInput fill={true} large={true} text={text} onInputChange={this.handleFolderBrowser} inputProps={inputProps as any} />
            </form>
        )
    }
}

