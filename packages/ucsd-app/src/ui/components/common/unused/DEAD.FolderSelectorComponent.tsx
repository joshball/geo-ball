// import * as React from 'react'
// import { observer } from 'mobx-react';
// import { FileInput, Label, Button, Intent, ControlGroup, InputGroup, Icon } from '@blueprintjs/core';


// export interface IValidateFolder {
//     error: boolean;
//     reason: string;
// }

// export interface FolderSelectorComponentProps {
//     defaultText?: string;
//     selectedFolder?: string;
//     decorateSelectedFolder: (path: string) => string;
//     validateFolder: (path: string) => Promise<IValidateFolder>;
//     submitNewFolder: (path: string) => Promise<IValidateFolder>;
// }

// export interface FolderSelectorComponentState {
//     selectedFolder?: string | undefined;
// }

// @observer
// export class FolderSelectorComponent extends React.Component<FolderSelectorComponentProps, FolderSelectorComponentState> {

//     state: FolderSelectorComponentState;

//     constructor(props: FolderSelectorComponentProps) {
//         super(props);
//         this.state = {
//             // selectedFolder: this.props.selectedFolder
//         };
//         this.handleManualEntry = this.handleManualEntry.bind(this);
//         this.handleFolderBrowser = this.handleFolderBrowser.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }


//     handleSelectedFolderValidation(valid: IValidateFolder, selectedFolder: string) {
//         if (!valid.error) {
//             this.setState({
//                 selectedFolder
//             });
//         }
//         else {
//             console.log('show error:', valid.reason);
//         }
//     }
//     async handleManualEntry(event: any) {
//         event.preventDefault();
//         this.setFolder(event.target.value);
//     }

//     async handleFolderBrowser(event: any) {
//         event.preventDefault();
//         this.setFolder(event.target.value);
//     }

//     async handleSubmit(event: any) {
//         event.preventDefault();
//         const folder = event.target.value;
//         this.setFolder(folder);
//         const valid = await this.props.submitNewFolder(folder);
//         this.handleSelectedFolderValidation(valid, folder);
//     }

//     async setFolder(folder: string) {
//         const valid = await this.props.validateFolder(folder);
//         this.handleSelectedFolderValidation(valid, folder);
//     }

//     render() {
//         console.log('FolderSelector.render().props', this.props.selectedFolder);
//         console.log('FolderSelector.render().state', this.state.selectedFolder);
//         const selectedFolder = this.state.selectedFolder || this.props.selectedFolder
//         const inputProps = { webkitdirectory: 'true' };
//         const text = selectedFolder
//             ? selectedFolder
//             : this.props.defaultText || 'Choose a folder';
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <ControlGroup fill={true} vertical={false}>
//                     <Label className="bp3-file-input bp3-large">
//                         <input type="file" {...inputProps} style={{width:'400px'}}/>
//                         <span className="bp3-file-upload-input" style={{display:'inline-block',width:'400px'}}>{text}</span>
//                         <Button icon="saved" style={{marginLeft:'6px'}}>Save</Button>
//                     </Label>
//                 </ControlGroup>
//             </form>
//         )
//     }
// }

