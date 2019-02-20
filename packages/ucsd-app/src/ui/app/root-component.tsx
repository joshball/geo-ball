// This is the top-most component in the app.

// tslint:disable-next-line:no-submodule-imports
import "glamor/reset";

import * as React from "react"
import { HashRouter as Router } from 'react-router-dom';
import { compose } from "glamor"
import { Provider, observer } from "mobx-react";
import * as devtron from 'devtron';
devtron.install();

// import DevTools from 'mobx-react-devtools';
// import { autorun } from "mobx";

import { styles, colors } from "../config/theme"

import { MAIN_ROUTE_COMPONENTS } from "../config/routes"

import { NavBarMenuComponent } from "../components/layout/NavBarMenuComponent";
import { RootStore } from "../stores/RootStore";

import state from "../state/State";
import { MemoryRouterProps, Switch } from "react-router";

// import BackgroundTask from '../../background/BackgroundTask';
const rootStore = new RootStore(state);

const ROOT = compose(styles.fullScreen, {
    background: colors.window.background,
    "& ::-webkit-scrollbar": { backgroundColor: colors.scrollbar.base, width: 12, height: 12 },
    "& ::-webkit-scrollbar-track": { backgroundColor: colors.scrollbar.track },
    "& ::-webkit-scrollbar-thumb": { backgroundColor: colors.scrollbar.thumb, borderRadius: 4 },
})

export class DebugRouter extends Router {
    constructor(props: MemoryRouterProps) {
        super(props);
        const mr = this as any;
        // console.log('initial history is: ', JSON.stringify(mr.history, null, 2))
        mr.history.listen((location: any, action: any) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            )
            console.log(`The last navigation action was ${action}`, JSON.stringify(mr.history, null, 2));
        });
    }
}
@observer
export class RootComponent extends React.Component<{}, {}> {
    render() {
        console.log('location.pathname:', location.pathname)
        return (
            <DebugRouter {...ROOT} >
                <Provider stores={rootStore}>
                    <div>
                        <NavBarMenuComponent />
                        <Switch>
                            {MAIN_ROUTE_COMPONENTS}
                        </Switch>
                    </div>
                </Provider>
            </DebugRouter>
        )
    }
}
