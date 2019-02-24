import * as React from 'react';
import { ThemeProvider, Container, LayoutSet } from 'fannypack';
import { theme } from '../../themes/default';


export class ApiPanelLayoutContainer extends React.Component {
    render() {
        const panelStyle = {
            minHeight: 'calc(100vh - 100px)',
            padding: '10px',
        };
        return (
            <ThemeProvider theme={theme}>
                <Container breakpoint="fullHD" style={panelStyle}>
                    <LayoutSet>
                        {this.props.children}
                        {/* <div style={panelStyle}>
                    </div> */}
                    </LayoutSet>
                </Container>
            </ThemeProvider>
        );
    }
}
