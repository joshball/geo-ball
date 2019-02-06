import * as React from 'react'
import { css } from 'glamor'
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from "../../config/theme"
import { RootStore } from '../../stores/RootStore';
import { FileComponent } from './FileComponent';
import { H3 } from '@blueprintjs/core';
import { OsmFetchGraphFilesSet } from '@geo-ball/ucsd-core';
import { basename } from 'path';

export interface SelectedFetchComponentProps {
    stores?: RootStore;
    fetch?: OsmFetchGraphFilesSet;
}

export interface SelectedFetchComponentState {
    selected: string;
}

const mainLayout = css({
    display: 'grid',
    minHeight: '100%',
    gridTemplateRows: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateAreas: 'osm rsd pmf int',
});

export const outerBoxCss = css({
    flex: '0 0 auto',
    margin: '10px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
})

const BaseFileComponent = (title: string, filePath: string) => {
    return (
        <div className={`${outerBoxCss}`}>
            <H3>{title}</H3>
            <div>
                {basename(filePath)}
            </div>
        </div >
    );
}
const OsmFileComponent = (props: any) => BaseFileComponent("OpenStreetMap Files", props.path);
const RsdFileComponent = (props: any) => BaseFileComponent("Road Segment Files", props.path);
const PmfFileComponent = (props: any) => BaseFileComponent("Point Map Files", props.path);
const IntFileComponent = (props: any) => BaseFileComponent("Intersection Files", props.path);

@inject("stores")
@observer
export class SelectedFetchComponent extends React.Component<SelectedFetchComponentProps, SelectedFetchComponentState> {
    state: SelectedFetchComponentState = {
        selected: '',
    };
    render() {
        const { fetch } = this.props;
        // console.log('render. results', this.state.results)
        if (fetch) {
            return (
                <div className={`${mainLayout}`}>
                    <OsmFileComponent path={fetch.osm.path} />
                    <RsdFileComponent path={fetch.rsd.path} />
                    <PmfFileComponent path={fetch.pmf.path} />
                    <IntFileComponent path={fetch.int.path} />
                </div>
                // <div className={`${mainLayout}`}>
                //     <H3>TITLE</H3>
                //     <div>
                //         <OsmFileComponent path={fetch.osm.path} />
                //         <RsdFileComponent path={fetch.rsd.path} />
                //         <PmfFileComponent path={fetch.pmf.path} />
                //         <IntFileComponent path={fetch.int.path} />
                //     </div>
                // </div>
            );
        }
        return null;
    }
}
