// This is the top-most component in the app.
import * as React from "react"
import { MemoryRouter, Link } from 'react-router-dom';
import "glamor/reset";
import { compose } from "glamor"
import { Provider, observer } from "mobx-react";
require('devtron').install()
// import DevTools from 'mobx-react-devtools';
// import { autorun } from "mobx";

import { styles, colors } from "../config/theme"
import { ROUTE_COMPONENTS } from "../config/routes"
import { NavBarMenuComponent } from "../components/layout/NavBarMenuComponent";
import { RootStore } from "../stores/RootStore";

import state from "../state/State";

// import BackgroundTask from '../../background/BackgroundTask';
const rootStore = new RootStore(state);

const ROOT = compose(styles.fullScreen, {
    background: colors.window.background,
    "& ::-webkit-scrollbar": { backgroundColor: colors.scrollbar.base, width: 12, height: 12 },
    "& ::-webkit-scrollbar-track": { backgroundColor: colors.scrollbar.track },
    "& ::-webkit-scrollbar-thumb": { backgroundColor: colors.scrollbar.thumb, borderRadius: 4 },
})

@observer
export class RootComponent extends React.Component<{}, {}> {
    render() {
        console.log('location.pathname:', location.pathname)
        return (
            <MemoryRouter {...ROOT} >
                <Provider stores={rootStore}>
                    <div>
                        <NavBarMenuComponent />
                        {ROUTE_COMPONENTS}
                    </div>
                </Provider>
            </MemoryRouter>
        )
    }
}
