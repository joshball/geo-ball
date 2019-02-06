import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { basename } from 'path';


export interface FileComponentProps {
    stores?: RootStore;
    filename: string;
}


export const singleResultCss = css({
    border: '1px solid #EFCAC450',
    backgroundColor: '#EFCAC415',
    marginTop: '10px',
    padding: '6px'
})



@inject("stores")
@observer
export class FileComponent extends React.Component<FileComponentProps> {
    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${singleResultCss}`}>
                {basename(this.props.filename)}
            </div >
        )
    }
}


