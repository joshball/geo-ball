import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Intent, Button } from '@blueprintjs/core';
import { css } from 'glamor';

export interface IDirectoryChooserButtonComponentProps {
    /**
     * onFileInputDirectorySelected callback
     * It is called when a directory is selected by the user
     */
    onFileInputDirectorySelected: (file: File) => void;
}

export class DirectoryChooserButtonComponent extends React.Component<
    IDirectoryChooserButtonComponentProps
> {
    fileInputRef: React.RefObject<any>;
    fileInputId: string;
    inputFileCss: any;
    inputFileProps: { webkitdirectory: string };

    constructor(props: IDirectoryChooserButtonComponentProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onFileInputChange = this.onFileInputChange.bind(this);
        this.fileInputRef = React.createRef();
        this.fileInputId = uuid();
        this.inputFileProps = { webkitdirectory: 'true' };
        this.inputFileCss = css({
            visibility: 'hidden',
            position: 'absolute',
        });
    }

    onClick(event: any) {
        event.preventDefault();
        console.log('this.fileInput.current', this.fileInputRef);
        this.fileInputRef.current.click();
    }

    onFileInputChange(event: any) {
        event.preventDefault();
        const { files } = this.fileInputRef.current;
        if (files.length === 1) {
            const file = files[0];
            this.props.onFileInputDirectorySelected(file);
        }
    }

    render() {
        return (
            <div>
                <label htmlFor={this.fileInputId}>
                    <Button icon="folder-open" intent={Intent.PRIMARY} onClick={this.onClick}>
                        Select Dir
                    </Button>
                </label>
                <input
                    type="file"
                    {...this.inputFileCss}
                    {...this.inputFileProps}
                    id={this.fileInputId}
                    ref={this.fileInputRef}
                    onChange={this.onFileInputChange}
                />
            </div>
        );
    }
}
