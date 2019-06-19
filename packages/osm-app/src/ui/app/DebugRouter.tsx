import { HashRouterProps, HashRouter as Router } from 'react-router-dom';
// import * as devtron from "devtron"
// devtron.install()

export class DebugRouter extends Router {
    constructor(props: HashRouterProps) {
        super(props);
        const thisHashRouter = this as any;
        // console.log('initial history is: ', JSON.stringify(thisHashRouter.history, null, 2))
        thisHashRouter.history.listen((location: any, action: any) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            );
            console.log(
                `The last navigation action was ${action}`,
                JSON.stringify(thisHashRouter.history, null, 2)
            );
        });
    }
}
