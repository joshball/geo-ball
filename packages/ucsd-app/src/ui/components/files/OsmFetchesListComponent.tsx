import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { FileComponent } from './FileComponent';
import { H3 } from '@blueprintjs/core';
import { RootStore } from '../../stores/RootStore';
import { IOsmFetchDir } from '@geo-ball/ucsd-core';
import { OsmFetchComponent } from './OsmFetchComponent';
import { css } from 'glamor';

export interface OsmFetchesListComponentProps {
    stores?: RootStore;
    // fetches: Array<OsmFetchGraphFilesSet>;
    fetches: Array<IOsmFetchDir>;
    fetchClicked: (fetch: IOsmFetchDir) => void;
    // fetchClicked: (fetch: OsmFetchGraphFilesSet) => void;
}
export interface OsmFetchesListComponentState {
    selected: string;
}

export const outerBoxCss = css({
    margin: '10px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: '#ebf1f5',
});

@inject('stores')
@observer
export class OsmFetchesListComponent extends React.Component<
    OsmFetchesListComponentProps,
    OsmFetchesListComponentState
> {
    state: OsmFetchesListComponentState = {
        selected: '',
    };
    render() {
        const { fetches, fetchClicked } = this.props;

        // console.log('render. results', this.state.results)
        return (
            <div className={`${outerBoxCss}`}>
                <H3>OSM Fetches</H3>
                <div>
                    {fetches.map((f, i) => (
                        <OsmFetchComponent key={i} fetch={f} fetchClicked={fetchClicked} />
                    ))}
                </div>
            </div>
        );
    }
}
