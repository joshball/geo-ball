import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { downloadOsmFile } from '../../services/OsmService';


export interface DownloadOsmDataComponentProps {
    stores?: RootStore;
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

// [40.7563038, -111.8781928]
@inject("stores")
@observer
export class DownloadOsmDataComponent extends React.Component<DownloadOsmDataComponentProps> {
    state = {
        selected: undefined,
    }

    handleChange = (e: any) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleDownload = (e: any) => {
        e.preventDefault();
        // downloadOsmFile()
    }

    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                <form onSubmit={this.handleDownload}>
                    <h3 className={`${headingCss}`}>Download OSM Data</h3>
                    <button type="button" className="bp3-button bp3-large bp3-icon-add .modifier" >Download</button>
                </form>
            </div >
        )
    }
}

