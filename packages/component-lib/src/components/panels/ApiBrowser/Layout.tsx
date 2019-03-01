import * as React from 'react';
import { ThemeProvider } from '../../atoms';
import { fpTheme } from '../../themes';

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
