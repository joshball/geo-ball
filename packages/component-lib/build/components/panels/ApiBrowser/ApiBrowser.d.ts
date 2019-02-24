import * as React from 'react';
import { IHeaderContainerProps } from '../../organisms/Header';
import { IActionBarProps } from '../../organisms/ActionBar';
export interface IApiBrowserPageState {
    showPanels: {
        queryParamFormDebug: boolean;
        bodyParamFormDebug: boolean;
    };
}
export interface IApiBrowserPageStateFormProps<TApiResponse> {
    header: IHeaderContainerProps;
    formData: IApiBrowserPageState;
    fetch: () => Promise<TApiResponse>;
}
export declare class ApiBrowser<TApiResponse> extends React.Component<IApiBrowserPageStateFormProps<TApiResponse>, IApiBrowserPageState> {
    state: IApiBrowserPageState;
    actionBarProps: IActionBarProps;
    constructor(props: IApiBrowserPageStateFormProps<TApiResponse>);
    createActionBarProps(): IActionBarProps;
    render(): JSX.Element;
}
//# sourceMappingURL=ApiBrowser.d.ts.map