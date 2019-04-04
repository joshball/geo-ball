import * as React from 'react';

import { Form, Text } from 'informed';

import { InformedFormContainer } from './InformedFormComponent';
import { TestFormData, ITestFormData } from './TestFormData';

export interface IInformedTestsPanelState {}

export interface IInformedTestsPanelProps {}

export class InformedTestsPanel extends React.Component<
    IInformedTestsPanelProps,
    IInformedTestsPanelState
> {
    state: IInformedTestsPanelState;
    constructor(props: IInformedTestsPanelProps) {
        super(props);

        this.state = {};

        this.fetchIt = this.fetchIt.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    fetchIt(): Promise<void> {
        console.log('InformedTestsPanel.fetchIt()');
        return Promise.resolve();
    }
    onSubmit(values: ITestFormData, actions: any) {
        console.log('InformedTestsPanel.onSubmit()', values, actions);
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
        const informedProps: any = {
            initialValues: new TestFormData(),
            onSubmit: this.onSubmit,
        };
        return (
            <div>
                {/* <BasicExampleOrig />
                <BasicExample {...formikProps} />
                <BasicExampleWithRender {...formikProps} />
                <BasicExampleAsComponent {...formikProps} />
                <BasicExampleWithChildren {...formikProps} /> */}
                <InformedFormContainer {...informedProps} />
            </div>
        );
    }
}
