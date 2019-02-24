import * as React from 'react';
export interface IHeaderContainerProps {
    name: string;
    helpUrl: string;
    openUrlCb: (url: string) => void;
}
export declare class HeaderContainer extends React.Component<IHeaderContainerProps> {
    constructor(props: IHeaderContainerProps);
    onClick(e: any): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Header.d.ts.map