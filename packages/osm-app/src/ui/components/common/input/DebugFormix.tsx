import React from 'react';
import { FormikConsumer } from 'formik';

export const DebugFormix = () => (
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
        {/* {({ validationSchema, validate, onSubmit, ...rest }) => ( */}
        <FormikConsumer>
            {({ validate, resetForm, ...rest }) => {
                console.log('DEBUG:', rest);
                // console.log('DEBUG:', validate, resetForm, rest)
                // console.log('DEBUG rest...', rest)
                // console.log('DEBUG.this:', this)
                // console.log('formiksProps', JSON.stringify(formikProps, null, 4))
                return (
                    <pre
                        style={{
                            fontSize: '.65rem',
                            height: '500px',
                            padding: '.25rem .5rem',
                            overflowX: 'scroll',
                        }}
                    >
                        {/* {JSON.stringify(rest, null, 2)} */}
                    </pre>
                );
            }}
        </FormikConsumer>
    </div>
);
