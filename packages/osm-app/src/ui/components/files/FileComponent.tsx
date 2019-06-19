import React from 'react';
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from '../../config/theme';
import { basename } from 'path';

export interface FileComponentProps {
    filename: string;
}
const singleResultCss = {};

// export const singleResultCss = css({
//     border: '1px solid #EFCAC450',
//     backgroundColor: '#EFCAC415',
//     marginTop: '10px',
//     padding: '6px',
// });

export class FileComponent extends React.Component<FileComponentProps> {
    render() {
        // console.log('render. results', this.state.results)
        return (
            <div className={`${singleResultCss}`}>
                {basename(this.props.filename)}
            </div>
        );
    }
}
