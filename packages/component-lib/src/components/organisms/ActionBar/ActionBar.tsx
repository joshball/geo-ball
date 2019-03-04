import * as React from 'react';
import { Card, Block, Box, Container, InlineBlock } from '../../atoms';
import { DebugToggles, IActionBarDebugTogglesProps } from './DebugToggles';
import { SubmitButton, ISubmitButtonProps } from '../../molecules/SubmitButton/SubmitButton';
import { cssProps } from '../../../types';

/** These are the props for the action bar */
export interface IActionBarProps {
    /**
     * This is the debug toggles description
     */
    debugToggles: IActionBarDebugTogglesProps;

    /** This is the request button description */
    submitButtonProps: ISubmitButtonProps;
}

/**
 * This bar holds all the actions
 * @param props IActionBarProps
 */
export const ActionBar = (props: IActionBarProps) => {
    const actionBarDivStyle = {
        overflow: 'hidden',
        // minHeight: '30px',
        // height: '100%',
        // float: 'right',
        // display: 'flex',
    };

    const toggleDivStyle = cssProps({
        float: 'right',
        display: 'inline-block',
    });
    const submitDivStyle = cssProps({
        float: 'right',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    });

    console.log('ActionBar PROPS:', props);

    return (
        <Container align="right" height="fit-content">
            <InlineBlock float="right" clear="both">
                <DebugToggles {...props.debugToggles} />
            </InlineBlock>
            <InlineBlock float="right" clear="both">
                <SubmitButton {...props.submitButtonProps} />
            </InlineBlock>
            <Box clear="both" />
        </Container>
    );
    // return (
    //     <div style={actionBarDivStyle}>
    //         <div style={toggleDivStyle}>
    //             <DebugToggles {...props.debugToggles} />
    //         </div>
    //         <div style={submitDivStyle}>
    //             <SubmitButton {...props.submitButtonProps} />
    //         </div>
    //     </div>
    // );
};
