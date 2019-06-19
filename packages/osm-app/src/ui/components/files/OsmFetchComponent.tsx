import React from 'react';
import { LocalDateTime } from '@geo-ball/utils';
import { IOsmFetchDir } from '@ui/services/fetch/OsmFetchDir';

export interface OsmFetchComponentProps {
    fetch: IOsmFetchDir;
    fetchClicked: (fetch: IOsmFetchDir) => void;
}

// export const singleResultCss = css({
//     border: '1px solid #EFCAC450',
//     backgroundColor: '#EFCAC415',
//     marginTop: '10px',
//     padding: '6px',
// });
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
            fldt.timezoneName
        );
        const runTitle =
            ldt.jsDate.toLocaleDateString() +
            ' ' +
            ldt.jsDate.toLocaleTimeString();
        return <div onClick={this.handleClick}>{runTitle}</div>;
    }
}
