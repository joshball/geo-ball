// import * as React from 'react'
// import { css } from 'glamor'
// import { observer, inject } from 'mobx-react';
// import { colors, fontSizes, fonts } from "../../config/theme"
// import { RootStore } from '../../stores/RootStore';
// import { Popover, PopoverInteractionKind, Button, Intent, FileInput, Position, Label, HTMLTable, H1, H3, H6 } from '@blueprintjs/core';
// import { join, dirname } from 'path';
// import { IValidateFolder, FolderSelectorComponentProps } from '../common/unused/FolderSelectorComponent';
// import { CenteredContent } from '../common/CenteredContent';
// import { HomeFolderSelectorComponent } from './HomeFolderSelectorComponent';


// export interface UcsdManagedDirComponentProps {
//     stores?: RootStore;
// }

// export interface UcsdManagedDirComponentState {
//     managedDir: string;
// }


// const labelCss = css({
//     color: colors.text,
//     fontSize: fontSizes.medium,
//     fontFamily: fonts.Roboto,
//     padding: 0,
//     margin: 0,
// })

// const tdCss = css({
//     textAlign: 'center !important',
//     verticalAlign: 'middle  !important'
// })

// const outerBoxCss = css({
//     // flex: '0 0 auto',
//     margin: '15px',
//     padding: '15px',
//     display: 'block',
//     minWidth: '600px',
//     // borderRadius: '6px',
//     // backgroundColor: '#ebf1f5',
// })
// // style={{ minWidth: '600px', width: '600px', padding: '20px 35px 20px 35px' }}
// const sameLineCss = css({
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     display: 'inline'
// })

// const dirOuterBoxCss = css({
//     width: '500px',
//     backgroundColor: '#EBF1F5',
//     margin: '10px auto',
//     padding: '10px; 5px',
//     // display: 'flex',
//     // justifyContent: 'space-between',
//     // flexWrap: 'wrap',
// })
// const dirBoxCss = css({
//     // display: 'inline-block'
//     display: 'flex',
//     // justifyContent: 'space-between',
//     // flexWrap: 'wrap',
// })
// const large = '.bp3-text-large';

// const dirLabelCss = css({
//     // flex: "1",
//     // flexBasis: '450px',
//     fontSize: "1.1em",
//     minWidth: "40%",
//     textAlign: "right",
//     paddingRight: "10px"

// })
// const dirCss = css({
//     fontSize: "1.1em",
//     // flexBasis: '450px',
//     // minWidth: "150px"
//     // minWidth: "70%",
// })

// const managedDataDirTxtEx = "c:\\fooooooo"
// const daHtml = (
//     <div className={`${dirOuterBoxCss}`}>
//         <div className={`${dirBoxCss}`}>
//             {/* <div className={`${dirLabelCss}`}><strong>UCSD Managed Data Dir:</strong></div> */}
//             <div className={`${dirCss}`}><strong><code>{managedDataDirTxtEx}</code></strong></div>
//         </div>
//     </div>
// )
// @inject("stores")
// @observer
// export class UcsdManagedDirComponent extends React.Component<UcsdManagedDirComponentProps, UcsdManagedDirComponentState> {

//     state: UcsdManagedDirComponentState;

//     constructor(props: UcsdManagedDirComponentProps) {
//         super(props);
//         console.log('props.stores', props.stores)
//         console.log('props.stores.data', props.stores!.data)
//         console.log('props.stores.data.getManagedDirectory', props.stores!.data.getDataDirectoryPath)
//         this.state = {
//             // managedDir: this.props.stores!.data.getManagedDirectory(),
//             managedDir: this.props.stores!.data.getDataDirectoryPath(),
//         };
//         this.validateFolder = this.validateFolder.bind(this);
//         this.submitNewFolder = this.submitNewFolder.bind(this);
//     }


//     decorateSelectedFolder(path: string): string {
//         return join(path, '.ucsdXXX');
//     }

//     async validateFolder(path: string): Promise<IValidateFolder> {
//         return Promise.resolve({ error: false, reason: '' });
//     }
//     async submitNewFolder(path: string): Promise<IValidateFolder> {
//         return Promise.resolve({ error: false, reason: '' });
//         // if (!this.state.managedDir) {
//         //     console.log('BUGBUG: warn the user!')
//         //     return;
//         // }
//         // this.props.stores!.data.setManagedDirectory(this.state.managedDir);
//     }

//     render() {
//         let { managedDir } = this.state;
//         managedDir = 'c:\\tmp'
//         const defaultText = 'Select the root folder for your your files...'
//         const managedRootDirTxt = managedDir ? dirname(managedDir) : 'NONE SELECTED';
//         const managedDataDirTxt = managedDir || 'NONE SELECTED';
//         const props: FolderSelectorComponentProps = {
//             defaultText,
//             selectedFolder: managedDir,
//             decorateSelectedFolder: this.decorateSelectedFolder,
//             validateFolder: this.validateFolder,
//             submitNewFolder: this.submitNewFolder,
//         }

//         const setDirForm = <div style={{ maxWidth: '600px', width: '500px', padding: '20px 35px 20px 35px' }}>
//             <HomeFolderSelectorComponent {...props} />
//         </div>;

//         return (
//             <div className={`${outerBoxCss}`}>
//                 <CenteredContent>

//                     <H3>Where would you like to store your ucsd data files?</H3>
//                     <div style={{ minWidth: '500px', display: 'block' }}>
//                         <HomeFolderSelectorComponent
//                             defaultText={`Select the root folder for your your files...`}
//                             selectedFolder={managedDir}
//                             decorateSelectedFolder={this.decorateSelectedFolder}
//                             validateFolder={this.validateFolder}
//                             submitNewFolder={this.submitNewFolder}
//                         />
//                     </div>
//                 </CenteredContent>
//             </div >
//         )
//     }
// }


