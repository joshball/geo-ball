import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { FileListComponent } from './FileListComponent';


export interface MapDataFilesComponentProps {
    stores?: RootStore;
}
export interface MapDataFilesComponentState {
    osmFiles: Array<string>;
    rsdFiles: Array<string>;
    intFiles: Array<string>;
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
const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateAreas: 'osm rsd int',
});


@inject("stores")
@observer
export class MapDataFilesComponent extends React.Component<MapDataFilesComponentProps, MapDataFilesComponentState> {

    state: MapDataFilesComponentState = {
        osmFiles: ['sugarhouse.osm', 'slc.osm'],
        rsdFiles: ['sugarhouse.rsd', 'slc.rsd'],
        intFiles: ['sugarhouse.int', 'slc.int'],
    }

    handleSearch = (e: any) => {
        e.preventDefault()
    }

    render() {
        const { osmFiles, rsdFiles, intFiles } = this.state;
        // console.log('render. results', this.state.results)
        return (
            <div className={`${mainLayout}`}>
                <FileListComponent files={osmFiles} title="OpenStreetMap Files" />
                <FileListComponent files={rsdFiles} title="Road Segment Files" />
                <FileListComponent files={intFiles} title="Intersection Files" />
            </div >
        )
    }
}

