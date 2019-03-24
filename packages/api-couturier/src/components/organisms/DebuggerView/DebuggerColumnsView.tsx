import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

import { styled, Box, LayoutSet, Divider, Columns, Column, Card } from '@geo-ball/component-lib';

import * as THEME from '../../themes/ApiStyles';
import { SimpleDebugFormixDiv } from './DebugFormixDiv';

{
    /* <Divider marginTop="major-4" />
                            <Box marginTop="major-4">
                                <Columns>
                                    <Column>
                                        <Card padding="0.5rem" title="Parameters" height="400px">
                                            <pre>STUFF</pre>
                                        </Card>
                                    </Column>
                                    <Column>
                                        <Card
                                            padding="0.5rem"
                                            title="Parameters Encoded"
                                            height="400px"
                                        >
                                            <pre>STUFF</pre>
                                        </Card>
                                    </Column>
                                    <Column>
                                        <Card
                                            padding="0.5rem"
                                            title="Formix State"
                                            height="400px"
                                            overflow="auto"
                                        >
                                            <SimpleDebugFormixDiv />
                                        </Card>
                                    </Column>
                                </Columns>
                            </Box>
 */
}

const DebugColumn = (columnTitle: string, index: number, child: any) => {
    return (
        <Column key={index}>
            <Card padding="0.5rem" title={columnTitle} height="400px" overflow="auto">
                {child}
            </Card>
        </Column>
    );
};

export const DebuggerColumnsView: FunctionComponent<ReactNode> = (props: any) => {
    // console.log('DebuggerColumnsView.children', props.children);
    // console.log('DebuggerColumnsView.children count', React.Children.count(props.children));
    // console.log('DebuggerColumnsView.DebugColumn', DebugColumn);
    if (!props.children || React.Children.count(props.children) === 0) {
        return null;
    }
    const stuff = React.Children.map(props.children, (child, index) => {
        return <Column key={index}>{child}</Column>;
    });
    return (
        <Box marginTop="major-4">
            <Columns>{stuff}</Columns>
        </Box>
    );
};
// const DebugColumn = styled(Box)`
//     display: block;
//     overflow-wrap: break-word;
//     overflow: auto;
// `;
