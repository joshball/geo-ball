import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';


export interface FileComponentProps {
    stores?: RootStore;
    filename: string;
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


const outerBoxCss = css({
    flex: '0 0 auto',
    margin: '15px',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
})

@inject("stores")
@observer
export class FileComponent extends React.Component<FileComponentProps> {
    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                {this.props.filename}
            </div >
        )
    }
}

