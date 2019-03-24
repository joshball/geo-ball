import * as React from 'react';
import { FunctionComponent } from 'react';
import { Card } from '@geo-ball/component-lib';

import { ApiFormSectionMgr } from '../../../utils';
import { ApiFormSectionView } from './ApiFormSectionView';
import { DebuggerColumnsView } from '../DebuggerView/DebuggerColumnsView';
import { SimpleDebugFormixDiv } from '../DebuggerView/DebugFormixDiv';

export interface IUrlParamsDebuggerViewProps {
    formMgr: ApiFormSectionMgr<any>;
}
export const UrlParamsDebuggerView: FunctionComponent<IUrlParamsDebuggerViewProps> = ({
    formMgr,
}) => {
    console.log('UrlParamsDebuggerView.formMgr', formMgr);
    let formValues;
    formMgr.getFormValues().then(fv => (formValues = fv));
    console.log('UrlParamsDebuggerView.formValues', formValues);
    return (
        <DebuggerColumnsView>
            <Card padding="0.5rem" title="Parameters" height="400px">
                <pre>{JSON.stringify(formValues, undefined, 4)}</pre>
            </Card>
            <Card padding="0.5rem" title="Parameter Encoded" height="400px">
                <pre>STUFF</pre>
            </Card>
            <Card padding="0.5rem" title="Form State" height="400px">
                <SimpleDebugFormixDiv />
            </Card>
        </DebuggerColumnsView>
    );
};

export interface IUrlParamsSectionViewProps {
    urlParams: ApiFormSectionMgr<any>;
}
/**
 * This will render then URL Params FORM and Debbugger view
 */
export const UrlParamsSectionView = ({ urlParams }: IUrlParamsSectionViewProps) => {
    const props = {
        title: 'Query Params',
        formMgr: urlParams,
        mainForm: urlParams.form(urlParams.config),
        // debugForm: <div>Debug Form</div>,
        debugForm: UrlParamsDebuggerView,
    };
    // DebuggerColumnsView;
    return (
        <div>
            <ApiFormSectionView {...props} />
        </div>
    );
};
