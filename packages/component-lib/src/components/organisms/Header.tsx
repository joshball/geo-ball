import * as React from 'react';

export interface IHeaderContainerProps {
    name: string;
    helpUrl: string;
    openUrlCb: (url:string) => void;
}

export class HeaderContainer extends React.Component<IHeaderContainerProps> {
    constructor(props: IHeaderContainerProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }
    onClick(e: any) {
        e.preventDefault();
        this.props.openUrlCb(this.props.helpUrl);
    }
    render() {
        const headerDiv = {
            display: 'flex',
            padding: '20px 50px 20px 40px',
            marginBottom: '10px',
            justifyContent: 'space-between',
            // color: 'white',
            // backgroundColor: colors.lgtGreen,
        };
        const headerName = {
            fontFamily: "Fira Code, Operator Mono, -apple-system, Helvetica Neue, Segoe UI, Roboto, Liberation Sans",
            fontWeight: 700,
            fontSize: '36px'
        };
        const headerHelp = {
            display: 'inline-block',
            // color: 'white',
        };
        return (<div style={headerDiv}>
            <div style={headerName}>
                {this.props.name}
                YEAH
            </div>
            <div style={headerHelp}>
                <a  href="{this.props.helpUrl}" onClick={this.onClick}>{this.props.helpUrl}</a>
            </div>
        </div>);
    }
}
