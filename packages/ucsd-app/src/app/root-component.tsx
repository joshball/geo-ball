// This is the top-most component in the app.
import * as React from "react"
import { compose } from "glamor"
import { styles, colors } from "../pages/theme"
import { MapDownloadPage } from "../pages/MapData/MapDownloadPage";
import { WelcomePage } from "../pages/WelcomePage";
// import rootStore, { MapStore, MapState } from "../stores";
import { MapState } from "../stores/MapState";
import { Provider, observer } from "mobx-react";
import DevTools from 'mobx-react-devtools';
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

const mapState = new MapState();
// const mapStore = new MapStore(rootStore);
// console.log('mapStore', mapStore)
@observer
export class RootComponent extends React.Component<{}, {}> {
    render() {
        return (
            <div  {...ROOT}>
                <Provider mapState={mapState}>
                    <div>
                        <MapDownloadPage />
                        <DevTools />
                    </div>
                </Provider>
            </div>
        )
    }
}
