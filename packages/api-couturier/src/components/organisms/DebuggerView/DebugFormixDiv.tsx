import * as React from 'react';

import { FormikConsumer } from 'formik';

import { Hidden, Card, Columns, Column, Box, Divider, Switch } from '@geo-ball/component-lib';

export const GenericFormWithDebug = (GenericForm: any, topProps: any) => {
    // console.log('topProps', topProps);
    // console.log('topProps.additionalProps', topProps.additionalProps);
    // const debugSwitch = {
    //     name: 'Show',
    //     checked: this.state.local[name],
    //     onChange: this.setLocalState,
    //     label: label,
    // };
    return GenericForm;

    return (
        <Hidden.Container>
            {(_hidden: any) => {
                const visible =
                    (topProps.additionalProps && topProps.additionalProps.showDebugForm) == true;
                console.log('DEBUG: visible', _hidden);
                // _hidden.show()
                console.log('DEBUG: visible', visible);
                return (
                    <div>
                        {GenericForm}
                        <Switch label="Debug Formik" onClick={_hidden.toggle} />
                        <Hidden isVisible={visible}>
                            <Divider marginTop="major-4" />
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
                        </Hidden>
                    </div>
                );
            }}
        </Hidden.Container>
    );
};

export const SimpleDebugFormixDiv = () => (
    // <div
    //     style={{
    //         margin: '3rem 0',
    //         borderRadius: 4,
    //         background: '#f6f8fa',

    //         boxShadow: '0 0 1px  #eee inset',
    //     }}
    // >
    //     <div
    //         style={{
    //             textTransform: 'uppercase',
    //             fontSize: 11,
    //             borderTopLeftRadius: 4,
    //             borderTopRightRadius: 4,
    //             fontWeight: 500,
    //             padding: '.5rem',
    //             background: '#555',
    //             color: '#fff',
    //             letterSpacing: '1px',
    //         }}
    //     >
    //         Formik State
    //     </div>
    <FormikConsumer>
        {({ validate, resetForm, ...rest }) => {
            return (
                <pre
                    style={{
                        fontSize: '.65rem',
                        height: '100%',
                        // height: '350px',
                        padding: '.25rem .5rem',
                    }}
                >
                    {JSON.stringify(rest, null, 2)}
                </pre>
            );
        }}
    </FormikConsumer>
    // </div>
);

export const DebugFormixDiv = () => (
    <div
        style={{
            margin: '3rem 0',
            borderRadius: 4,
            background: '#f6f8fa',

            boxShadow: '0 0 1px  #eee inset',
        }}
    >
        <div
            style={{
                textTransform: 'uppercase',
                fontSize: 11,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                fontWeight: 500,
                padding: '.5rem',
                background: '#555',
                color: '#fff',
                letterSpacing: '1px',
            }}
        >
            Formik State
        </div>
        <FormikConsumer>
            {({ validate, resetForm, ...rest }) => {
                return (
                    <pre
                        style={{
                            fontSize: '.65rem',
                            height: '350px',
                            padding: '.25rem .5rem',
                            overflowX: 'scroll',
                        }}
                    >
                        {JSON.stringify(rest, null, 2)}
                    </pre>
                );
            }}
        </FormikConsumer>
    </div>
);
