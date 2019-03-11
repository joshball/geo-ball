import * as React from 'react';

import {
    SimpleTypescriptFormContainer,
    ISimpleFormData,
} from './Forms/SimpleTypescriptFormComponent';
import { FormikConfig, FormikActions } from 'formik';

export interface IGenericTestFormPanelState {}

export interface IGenericTestFormPanelProps {}

export class GenericTestFormPanel extends React.Component<
    IGenericTestFormPanelProps,
    IGenericTestFormPanelState
> {
    state: IGenericTestFormPanelState;
    constructor(props: IGenericTestFormPanelProps) {
        super(props);

        this.state = {};

        this.fetchIt = this.fetchIt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    fetchIt(): Promise<void> {
        console.log('GenericTestFormPanel.fetchIt()');
        return Promise.resolve();
    }
    onSubmit(values: ISimpleFormData, actions: FormikActions<ISimpleFormData>) {
        console.log('GenericTestFormPanel.onSubmit()', values, actions);
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
                age: 10,
            },
            onSubmit: this.onSubmit,
        };
        return (
            <div>
                {/* <BasicExampleOrig />
                <BasicExample {...formikProps} />
                <BasicExampleWithRender {...formikProps} />
                <BasicExampleAsComponent {...formikProps} />
                <BasicExampleWithChildren {...formikProps} /> */}
                <SimpleTypescriptFormContainer {...formikProps} />
            </div>
        );
    }
}
