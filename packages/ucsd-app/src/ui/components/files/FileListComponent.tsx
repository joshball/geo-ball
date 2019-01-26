import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { FileComponent } from './FileComponent';


export interface FileListComponentProps {
    stores?: RootStore;
    files: Array<string>;
    title: string;
}
export interface FileListComponentState {
    selected: string;
}


const singleResultCss = css({
    border: '1px solid grey',
    marginTop: '10px',
    padding: '6px'
})

const labelCss = css({
    color: colors.text,
    fontSize: fontSizes.medium,
    fontFamily: fonts.Roboto,
    padding: 0,
    margin: 0,
})

const llCss = css({
    marginLeft: '16px'
})

const outerBoxCss = css({
    flex: '0 0 auto',
    margin: '15px',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
})

const headingCss = css({
    marginBlockStart: '0',
    marginBlockEnd: '0',
})

@inject("stores")
@observer
export class FileListComponent extends React.Component<FileListComponentProps, FileListComponentState> {

    state: FileListComponentState = {
        selected: '',
    }

    render() {
        const { files, title } = this.props;
        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                <h2>{title}</h2>
                <div>
                    {files.map((f: string, i: number) => <FileComponent key={i} filename={f} />)}
                </div>
            </div >
        )
    }
}

