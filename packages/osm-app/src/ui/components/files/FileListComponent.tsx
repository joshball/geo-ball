import React from 'react';
import { observer, inject } from 'mobx-react';
import { colors, fontSizes, fonts } from '../../config/theme';
import { FileComponent } from './FileComponent';
import { H3 } from '@blueprintjs/core';

// export const outerBoxCss = css({
//     flex: '0 0 auto',
//     margin: '10px',
//     padding: '10px',
//     borderRadius: '6px',
//     backgroundColor: '#ebf1f5',
// });

export interface FileListComponentProps {
    files: Array<string>;
    title: string;
}
export interface FileListComponentState {
    selected: string;
}

export class FileListComponent extends React.Component<
    FileListComponentProps,
    FileListComponentState
> {
    state: FileListComponentState = {
        selected: '',
    };

    render() {
        const { files, title } = this.props;
        // console.log('render. results', this.state.results)
        return (
            <div>
                <H3>{title}</H3>
                <div>
                    {files.map((f: string, i: number) => (
                        <FileComponent key={i} filename={f} />
                    ))}
                </div>
            </div>
        );
    }
}
