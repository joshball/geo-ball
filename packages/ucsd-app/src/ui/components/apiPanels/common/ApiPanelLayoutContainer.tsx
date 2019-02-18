import * as React from 'react';

import { colors } from './ApiStyles';

export class ApiPanelLayoutContainer extends React.Component {
    render() {
        const panelStyle = {
            display: 'block',
            backgroundColor: colors.cream,
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return (<div style={panelStyle}>
            {this.props.children}
        </div>);
    }
}
