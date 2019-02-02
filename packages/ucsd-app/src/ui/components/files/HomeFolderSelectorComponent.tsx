import * as React from 'react'
import { observer } from 'mobx-react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { FolderSelectorComponent, FolderSelectorComponentProps } from '../common/FolderSelectorComponent';
import { app } from 'electron';


export interface IValidateFolder {
    error: boolean;
    reason: string;
}


@observer
export class HomeFolderSelectorComponent extends React.Component<FolderSelectorComponentProps> {

    constructor(props: FolderSelectorComponentProps) {
        super(props);
        this.setFolderHome = this.setFolderHome.bind(this);
        this.setFolderUserData = this.setFolderUserData.bind(this);
    }

    async setFolderHome() {
        const homeDir = app.getPath('home');
        this.props.submitNewFolder(homeDir);
    }
    async setFolderUserData() {
        const userDataDir = app.getPath('userData');
        this.props.submitNewFolder(userDataDir);
    }

    render() {
        return (
            <div>
                <FolderSelectorComponent {...this.props} />
                <ButtonGroup fill={true} minimal={true}>
                    <Button fill={false} large={true} icon="database" onClick={this.setFolderUserData}>Home Directory</Button>
                    <Button fill={false} large={true} icon="function" onClick={this.setFolderUserData}>Local Data Directory</Button>
                </ButtonGroup>
            </div>
        )
    }
}

