import * as React from 'react';
export interface IApiUrlParametersViewState {
    isOpen: boolean;
}
export interface IApiUrlParametersViewProps {
    formData: any;
}
export declare class ApiUrlParametersView extends React.Component<IApiUrlParametersViewProps, IApiUrlParametersViewState> {
    state: IApiUrlParametersViewState;
    constructor(props: IApiUrlParametersViewProps);
    private handleClick;
    render(): JSX.Element;
    getQueryParams(obj: any): {
        map: string[];
        url: string;
    };
}
export declare class ApiFormParametersView extends React.Component {
    render(): JSX.Element;
}
//# sourceMappingURL=Parameters.d.ts.map