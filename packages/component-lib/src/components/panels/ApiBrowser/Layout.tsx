import * as React from 'react';
// import { ThemeProvider, Container } from '../../atoms';
// import { ReakProvider } from '../../atoms';
// import { theme } from '../../themes/default';
// import theme from 'reakit-theme-default';

export class ApiPanelLayoutContainer extends React.Component {
    render() {
        const panelStyle = {
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return <div style={panelStyle}>{this.props.children}</div>;
    }
}
