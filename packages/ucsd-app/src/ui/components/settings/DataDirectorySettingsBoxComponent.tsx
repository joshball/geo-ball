import * as React from 'react'
import { css } from 'glamor'
import { Button, Intent, H3, ButtonGroup, H5 } from '@blueprintjs/core';
import { DirectoryChooserButtonComponent } from '../common/input/DirectoryChooserButtonComponent';
import { SaveCancelHideButtonComponent } from '../common/input/SaveCancelHideButtonComponent';




const dirSettingsBoxCss = css({
    minWidth: '600px',
    border: 'thick double #6B8790',
    margin: '10px auto',
    padding: '20px',
    overflow: 'hidden'
})

const settingsHeaderRowCss = css({
    alignItems: 'center',
    maxWidth: '600px',
})

const settingsSubHeaderRowCss = css({
    alignItems: 'center',
})

const settingsStaticValueCss = css({
    backgroundColor: '#E1949430',
    // fontFamily: "'Inconsolata', monospace",
    alignItems: 'center',
    padding: '3px',
    marginTop: '10px',
    marginBottom: '10px',
    // height: '3em',
    fontSize: '1em',
})
const settingsDynamicValueCss = css({
    backgroundColor: '#B0D9CD20',
    // fontFamily: "'Inconsolata', monospace",
    alignItems: 'center',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    height: '3em',
    fontSize: '1em',
})

const settingButtonsRowCss = css({
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: "'Cabin', sans-serif",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '20px',
})
const buttonSpaceCss = css({
    marginLeft: '20px',
})



export interface DataDirectorySettingsBoxProps {

    ballmapsDirName: string;
    ballmapsDirRootPath: string;
    ballmapsDirPath: string;


    setFolderBrowse: (event: any) => void;
    setFolderHome: () => void;
    setFolderAppUserData: () => void;


    /**
     * When a setting has changed on this page, it becomes dirty
     * and saveRequired is true. When dirty, two buttons will show
     * "cancel" and "save". These are those buttons callbacks.
     * "cancel" should reset everything to their original settings
     * "save" will validate the path and access to the directory
     * and updated the settings
     */
    saveRequired: boolean;
    clickCancel: (event: React.MouseEvent<HTMLElement>) => void;
    clickSave: (event: React.MouseEvent<HTMLElement>) => void;

    /**
     * This is a callback for the DirectoryChooserButtonComponent
     * It is called when a directory is selected by the user
     */
    onFileInputDirectorySelected: (file: File) => void;
}

export const DataDirectorySettingsBoxComponent: React.SFC<DataDirectorySettingsBoxProps> = (props: DataDirectorySettingsBoxProps) => {
    const saveButton = <SaveCancelHideButtonComponent {...props} />;
    return (
        <div {...dirSettingsBoxCss}>
            <div {...settingsHeaderRowCss}>
                <H3>Managed Data</H3>
                <p className={'bp3-running-text'}>
                    When you download OpenStreetMap data from the servers, that data is placed in
                    a managed directory. We parse that data into other meta data formats and use
                    it for the graph algorithms. The data is stored with precise filenames to keep
                    allow us to move it through its different stages.
                </p>
                <p className={'bp3-running-text'}>
                    By default, we also store the data in a directory named <code>.ballmaps</code>.
                    You can adjust that here as well, but note that any path you select will
                    append that value to that directory.
                </p>
            </div>
            <div {...settingsSubHeaderRowCss}>
                <H5>UCSD Directory Name</H5>
                <p className={'bp3-running-text'}>
                    By default, we also store the data in a directory named <code>.ballmaps</code>.
                    We don't recommend you change this, but if you need to, here you go.
                </p>
                <p {...settingsDynamicValueCss}>
                    <Button style={{ marginRight: '20px' }} intent={Intent.PRIMARY}>Edit</Button>
                    <code>
                        {props.ballmapsDirName}
                    </code>
                </p>
            </div>

            <div {...settingsSubHeaderRowCss}>
                <H5>Managed Directory Root</H5>
                <p className={'bp3-running-text'}>
                    Where the UCSD Managed Data Directory is stored
                </p>
                <p {...settingsDynamicValueCss}>
                    <code>
                        {props.ballmapsDirRootPath}
                    </code>
                </p>
            </div>
            <div {...settingButtonsRowCss}>
                <ButtonGroup>
                    <DirectoryChooserButtonComponent {...props} />
                    <Button {...buttonSpaceCss} intent={Intent.SUCCESS} icon="home" onClick={props.setFolderHome} >Home Dir</Button>
                    <Button intent={Intent.SUCCESS} icon="box" onClick={props.setFolderAppUserData} >Application User Data Dir</Button>
                </ButtonGroup>
            </div>

            <div {...settingsSubHeaderRowCss}>
                <H5>Managed Data Path</H5>
                <p className={'bp3-running-text'}>
                    This is the final constructed path of the data directory.
                </p>
                <p  {...settingsStaticValueCss}>
                    <code>
                        {props.ballmapsDirPath}
                    </code>
                </p>
            </div>
            {saveButton}
        </div>
    )
}

