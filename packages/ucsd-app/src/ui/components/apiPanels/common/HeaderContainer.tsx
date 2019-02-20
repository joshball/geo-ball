import * as React from 'react';
import { sectionHeaders } from '../../../config/theme/index';
import { shell } from 'electron';

export interface IHeaderContainerProps {
    name: string;
    helpUrl: string;
}

export class HeaderContainer extends React.Component<IHeaderContainerProps> {
    constructor(props: IHeaderContainerProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }
    onClick(e: any) {
        e.preventDefault();
        shell.openExternal(this.props.helpUrl);
    }
    render() {
        const headerDiv = {
            display: 'flex',
            padding: '20px 50px 20px 40px',
            marginBottom: '10px',
            justifyContent: 'space-between',
            color: 'white',
            // backgroundColor: colors.lgtGreen,
        };
        const headerName = {
            ...sectionHeaders[1]
        };
        const headerHelp = {
            display: 'inline-block',
            color:'white',
            ...sectionHeaders[4]
        };
        return (<div style={headerDiv}>
            <div style={headerName}>
                {this.props.name}
            </div>
            <div style={headerHelp}>
                <a style={{color:'#F0AF03'}} href="{this.props.helpUrl}" onClick={this.onClick}>{this.props.helpUrl}</a>
            </div>
        </div>);
    }
}
