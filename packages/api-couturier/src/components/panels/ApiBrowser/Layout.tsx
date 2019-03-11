import * as React from 'react';
import { ThemeProvider, fpTheme } from '@geo-ball/component-lib';

export class ApiPanelLayoutContainer extends React.Component {
    render() {
        const panelStyle = {
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return (
            <ThemeProvider theme={fpTheme}>
                <div style={panelStyle}>{this.props.children}</div>
            </ThemeProvider>
        );
    }
}
