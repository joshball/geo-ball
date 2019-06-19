import React from 'react';
import { Button, Intent } from '@blueprintjs/core';

export interface SaveCancelHideButtonProps {
    clickCancel: (event: React.MouseEvent<HTMLElement>) => void;
    clickSave: (event: React.MouseEvent<HTMLElement>) => void;
    saveRequired: boolean;
}

export const SaveCancelHideButtonComponent: React.SFC<SaveCancelHideButtonProps> = (
    props: SaveCancelHideButtonProps,
) => {
    // const displayStyle = props.saveRequired ? {} : { display: 'none' };
    console.log('SaveCancelHideButtonComponent props', props);
    const visibilityStyle = props.saveRequired
        ? { visibility: 'visible' }
        : { visibility: 'hidden' };
    // const styles = css({ ...visibilityStyle, float: 'right', marginLeft: '20px' });
    return (
        <div>
            <Button onClick={props.clickSave} icon="saved" intent={Intent.SUCCESS}>
                Make it so!
            </Button>
            <Button onClick={props.clickCancel} icon="undo" intent={Intent.DANGER}>
                Cancel
            </Button>
        </div>
    );
};
