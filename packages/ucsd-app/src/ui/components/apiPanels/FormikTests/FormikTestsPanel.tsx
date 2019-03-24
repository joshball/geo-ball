import * as React from 'react';
import { ThemeProvider, fpTheme } from '@geo-ball/component-lib';

import { SimpleTypescriptFormContainer, ISimpleFormData } from './FormikFormComponent';
import { FormikConfig, FormikActions } from 'formik';

export interface IFormikTestsPanelState {}

export interface IFormikTestsPanelProps {}

export class FormikTestsPanel extends React.Component<
    IFormikTestsPanelProps,
    IFormikTestsPanelState
> {
    state: IFormikTestsPanelState;
    constructor(props: IFormikTestsPanelProps) {
        super(props);

        this.state = {};

        this.fetchIt = this.fetchIt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    fetchIt(): Promise<void> {
        console.log('FormikTestsPanel.fetchIt()');
        return Promise.resolve();
    }
    onSubmit(values: ISimpleFormData, actions: FormikActions<ISimpleFormData>) {
        console.log('FormikTestsPanel.onSubmit()', values, actions);
        // console.log("GTFP.onSubmit().values", values)
        // console.log(JSON.stringify(values, null, 4))
        // console.log("GTFP.onSubmit().actions", actions)
        setTimeout(() => {
            console.log('GTFP.onSubmit().delay. Returning.');
            actions.setSubmitting(false);
        }, 1);
    }

    render() {
        // const foo = (props:IGenericGetUrlParams) => (
        //     <form onSubmit={props.handleSubmit}>
        //         <input
        //             type="text"
        //             onChange={props.handleChange}
        //             onBlur={props.handleBlur}
        //             value={props.values.query}
        //             name="name"
        //         />
        //         {props.errors.name && <div id="feedback">{props.errors.name}</div>}
        //         <button type="submit">Submit</button>
        //     </form>
        // )
        const formikProps: FormikConfig<ISimpleFormData> = {
            initialValues: {
                firstName: 'jared',
                lastName: '',
                username: '',
                email: 'jared@foo.com',
                email2: 's@foo.com',
                age: 10,
            },
            onSubmit: this.onSubmit,
        };
        const panelStyle = {
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return (
            <ThemeProvider theme={fpTheme}>
                <div style={panelStyle}>
                    {this.props.children}
                    {/* <BasicExampleOrig />
                        <BasicExample {...formikProps} />
                        <BasicExampleWithRender {...formikProps} />
                        <BasicExampleAsComponent {...formikProps} />
                        <BasicExampleWithChildren {...formikProps} /> */}
                    <SimpleTypescriptFormContainer {...formikProps} />
                </div>
            </ThemeProvider>
        );
    }
}
