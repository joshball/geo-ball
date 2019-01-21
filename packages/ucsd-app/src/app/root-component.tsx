// This is the top-most component in the app.
import * as React from "react"
import { compose } from "glamor"
import { styles, colors } from "../pages/theme"
import { MapDownloadPage } from "../pages/MapDownloadPage";
import { HomePage } from '../pages/HomePage';
// import rootStore, { MapStore, MapState } from "../stores";
import { MapState } from "../stores/MapState";
// import createStore from "../stores";
import { RootStore } from "../stores/RootStore";
import state from "../state/State";
import { Provider, observer } from "mobx-react";
import DevTools from 'mobx-react-devtools';
import { autorun } from "mobx";
// import { WelcomeScreen } from "../views/example/welcome-screen"
// import { WelcomeScreen } from '../views/example/welcome-screen/welcome-screen';
// tslint:disable-next-line:no-var-requires
// require("normalize.css/normalize.css");

const ROOT = compose(styles.fullScreen, {
    background: colors.window.background,
    "& ::-webkit-scrollbar": { backgroundColor: colors.scrollbar.base, width: 12, height: 12 },
    "& ::-webkit-scrollbar-track": { backgroundColor: colors.scrollbar.track },
    "& ::-webkit-scrollbar-thumb": { backgroundColor: colors.scrollbar.thumb, borderRadius: 4 },
})

const PAGES: any = {
    '/': HomePage,
    '/maps': MapDownloadPage,
    '/files': MapDownloadPage,
    '/routes': MapDownloadPage,
};

// const rootStore = createStore(state);
const rootStore = new RootStore(state);
// autorun(stores)


const mapState = new MapState();
// const mapStore = new MapStore(rootStore);
// console.log('mapStore', mapStore)
@observer
export class RootComponent extends React.Component<{}, {}> {
    render() {
        return (
            <div  {...ROOT}>
                <Provider stores={rootStore} mapState={mapState}>
                    <MapDownloadPage />
                </Provider>
            </div>
        )
    }
}
