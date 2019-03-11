import * as React from 'react';
import { css } from 'glamor';
import { observer, inject, propTypes } from 'mobx-react';
import { colors, fontSizes, fonts } from '../../config/theme';
import { RootStore } from '../../stores/RootStore';
import { basename } from 'path';
import { IOsmFetchDir } from '@geo-ball/ucsd-core';
import { LocalDateTime } from '@geo-ball/utils';

export interface OsmFetchComponentProps {
    stores?: RootStore;
    fetch: IOsmFetchDir;
    fetchClicked: (fetch: IOsmFetchDir) => void;
}

export const singleResultCss = css({
    border: '1px solid #EFCAC450',
    backgroundColor: '#EFCAC415',
    marginTop: '10px',
    padding: '6px',
});

@inject('stores')
@observer
export class OsmFetchComponent extends React.Component<OsmFetchComponentProps> {
    handleClick = (e: any): any => {
        e.preventDefault();
        this.props.fetchClicked(this.props.fetch);
    };

    render() {
        // console.log('render. results', this.state.results)
        // const ptd = findParseFilenameTimestamp(basename(this.props.fetch.fetchDirPath));
        // console.log('render.ptd', ptd)
        const fldt = this.props.fetch.fetchLocalDateTime;
        const ldt = new LocalDateTime(
            fldt.unixUtcEpochMs,
            fldt.timezoneOffsetMin,
            fldt.timezoneName,
        );
        const runTitle = ldt.jsDate.toLocaleDateString() + ' ' + ldt.jsDate.toLocaleTimeString();
        return (
            <div onClick={this.handleClick} className={`${singleResultCss}`}>
                {runTitle}
            </div>
        );
    }
}
