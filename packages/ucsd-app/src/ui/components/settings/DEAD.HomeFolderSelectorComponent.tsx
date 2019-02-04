// import * as React from 'react'
// import { observer } from 'mobx-react';
// import { Button, ButtonGroup } from '@blueprintjs/core';
// import { FolderSelectorComponent, FolderSelectorComponentProps } from '../common/unused/FolderSelectorComponent';
// import { remote } from 'electron';



// export interface FolderSelectorComponentState {
//     selectedFolder?: string | undefined;
// }

// @observer
// export class HomeFolderSelectorComponent extends React.Component<FolderSelectorComponentProps, FolderSelectorComponentState> {
//     state: FolderSelectorComponentState;

//     constructor(props: FolderSelectorComponentProps) {
//         super(props);
//         this.setFolderHome = this.setFolderHome.bind(this);
//         this.setFolderUserData = this.setFolderUserData.bind(this);
//         this.state = {
//             // selectedFolder: this.props.selectedFolder
//         };
//     }

//     async setFolderHome() {
//         const homeDir = remote.app.getPath('home');
//         this.setState({
//             selectedFolder: homeDir
//         });
//         console.log('set homeDir', homeDir)
//         // this.props.submitNewFolder(homeDir);
//     }
//     async setFolderUserData() {
//         const userDataDir = remote.app.getPath('userData');
//         console.log('set userDataDir', userDataDir)
//         this.setState({
//             selectedFolder: userDataDir
//         });
//         // this.props.submitNewFolder(userDataDir);
//     }

//     render() {
//         const newProps = { ...this.props };
//         newProps.selectedFolder = this.state.selectedFolder || this.props.selectedFolder;
//         return (
//             <div>
//                 <FolderSelectorComponent {...newProps} />
//                 <ButtonGroup fill={true} minimal={true}>
//                     <Button fill={false} large={true} icon="database" onClick={this.setFolderHome}>Home Directory</Button>
//                     <Button fill={false} large={true} icon="function" onClick={this.setFolderUserData}>Local Data Directory</Button>
//                 </ButtonGroup>
//             </div>
//         )
//     }
// }

