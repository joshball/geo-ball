import * as React from 'react';
import { Card, Columns, Column, Box } from '@geo-ball/component-lib';

export interface IParameterDebugSwitchGroupProps {
    height?: Optional<string>;
    debugParamersView: any;
    debugEncodedParamersView: any;
    debugFormView: any;
}

export const ParameterDebugSwitchGroup: React.FunctionComponent<
    IParameterDebugSwitchGroupProps
> = props => {
    if (!props) {
        return null;
    }
    const height = props.height || '400px';
    return (
        <Box marginTop="major-4">
            <Columns>
                <Column>
                    <Card padding="0.5rem" title="Parameters" height={height}>
                        {props.debugParamersView}
                    </Card>
                </Column>
                <Column>
                    {' '}
                    <Card padding="0.5rem" title="Parameters Encoded" height={height}>
                        {props.debugEncodedParamersView}
                    </Card>
                </Column>
                <Column>
                    <Card padding="0.5rem" title="Formix State" height={height} overflow="auto">
                        {props.debugFormView}
                        {/* <SimpleDebugFormixDiv /> */}
                    </Card>
                </Column>
            </Columns>
        </Box>
    );
};
