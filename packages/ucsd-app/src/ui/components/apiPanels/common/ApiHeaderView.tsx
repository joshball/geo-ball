import * as React from 'react';
import { sectionHeaders } from '../../../config/theme';
import { colors } from './ApiStyles';
import { shell } from 'electron';

export interface IApiHeaderViewProps {
    name: string;
    helpUrl: string;
}

export class ApiHeaderView extends React.Component<IApiHeaderViewProps> {
    constructor(props: IApiHeaderViewProps) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }
    onClick(e: any) {
        e.preventDefault();
        console.log('CLICK', e);
        console.log('CLICK', e.target);
        console.log('CLICK e.currentTarget', e.currentTarget);
        console.log('CLICK e.currentTarget.href', e.currentTarget.href);
        console.log('CLICK e.name', e.name);
        console.log('CLICK e.type', e.type);
        console.log('CLICK e.value', e.value);
        shell.openExternal(this.props.helpUrl);
    }
    render() {
        const headerDiv = {
            display: 'flex',
            padding: '20px 50px 20px 40px',
            marginBottom: '10px',
            justifyContent: 'space-between',
            backgroundColor: colors.lgtGreen,
        };
        const headerName = {
            ...sectionHeaders[1]
        };
        const headerHelp = {
            display: 'inline-block',
            ...sectionHeaders[4]
        };
        return (<div style={headerDiv}>
            <div style={headerName}>
                {this.props.name}
            </div>
            <div style={headerHelp}>
                <a href="{this.props.helpUrl}" onClick={this.onClick}>{this.props.helpUrl}</a>
            </div>
        </div>);
    }
}
