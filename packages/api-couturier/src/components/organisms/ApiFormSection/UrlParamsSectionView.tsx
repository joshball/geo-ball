import * as React from 'react';
import { Card } from '@geo-ball/component-lib';

import { ApiFormSectionMgr } from '../../../utils';
import { ApiFormSectionView } from './ApiFormSectionView';
import { DebuggerColumnsView } from '../DebuggerView/DebuggerColumnsView';
import { SimpleDebugInformedDiv } from '../DebuggerView/DebugInformedDiv';
import { withFormState, FormState } from 'informed';

export interface IUrlParamsDebuggerViewProps {
    formState: FormState<any>;
}

export const UrlParamsDebuggerView = withFormState(({ formState }: IUrlParamsDebuggerViewProps) => {
    console.log('$$$$$$$$$$$$$$$$ UrlParamsDebuggerView $$$$$$$$$');
    console.log('UrlParamsDebuggerView.formState', formState);
    console.log('UrlParamsDebuggerView HEY QUERY', formState.values);
    return (
        <DebuggerColumnsView>
            <Card padding="0.5rem" title="Parameters" height="400px">
                <pre>{JSON.stringify(formState.values, undefined, 4)}</pre>
            </Card>
            <Card padding="0.5rem" title="Parameter Encoded" height="400px">
                <pre>STUFF</pre>
            </Card>
            <Card padding="0.5rem" title="Form State" height="400px">
                <SimpleDebugInformedDiv {...formState} />
            </Card>
        </DebuggerColumnsView>
    );
});

export interface IUrlParamsSectionViewProps<TUrlParamsFormValues> {
    urlParams?: Optional<ApiFormSectionMgr<TUrlParamsFormValues>>;
}

/**
 * This will render then URL Params FORM and Debbugger view
 */
export const UrlParamsSectionView = <TUrlParamsFormValues extends {}>({
    urlParams: qpFormSectionMgr,
}: IUrlParamsSectionViewProps<TUrlParamsFormValues>) => {
    if (!qpFormSectionMgr) {
        return null;
    }
    const props = {
        title: 'Query Params',
        formMgr: qpFormSectionMgr,
        MainForm: qpFormSectionMgr.form,
        DebugForm: UrlParamsDebuggerView,
    };
    return <ApiFormSectionView {...props} />;
};
