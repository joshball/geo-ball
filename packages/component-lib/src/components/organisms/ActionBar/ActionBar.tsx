import * as React from 'react';
import { Box, Container, InlineBlock, Switch, SwitchField, styled } from '../../atoms';
import { SubmitButton, ISubmitButtonProps } from '../../molecules';
import use from "reuse";
/** These are the props for the action bar */
export interface IActionBarProps {
    mockApiCall: any; // SwitchProps;
    submitButtonProps: ISubmitButtonProps;
}

const ActionToolbarOuterContainer = styled(Box)`
    display: flex;
`;

const ActionToolbarInnerContainer = styled(Box)`
    border-radius: 0.25em;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 10px;
`;

const SwitchWrapper = styled(Box)`
    display: flex;
    margin-right: 60px;
    margin-left: 20px;
`;

const SwitchWrapperEx = use(SwitchWrapper, Switch);

const FlexSubmitButton = styled(SubmitButton)`
    margin-left: 10px;
`;

/**
 * This bar holds all the actions
 * @param props IActionBarProps
 */
export const ActionBar = (props: IActionBarProps) => {
    const { mockApiCall, submitButtonProps } = props;
    return (
        <ActionToolbarOuterContainer>
            <ActionToolbarInnerContainer>
                <SwitchWrapper>
                    <Switch {...mockApiCall} />
                </SwitchWrapper>
                <SwitchWrapperEx {...mockApiCall} />

                <FlexSubmitButton {...submitButtonProps} />
            </ActionToolbarInnerContainer>
        </ActionToolbarOuterContainer>
    );
};
