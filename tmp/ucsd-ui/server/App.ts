// import * as logger from 'morgan';
import express from 'express';
import * as bodyParser from 'body-parser';
import { getMaps, getMap } from './dataFiles';
import { RoadSegmentLine, RoadSegmentMetaData, GeoGraph } from 'ball-graph';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    // Configure Express middleware.
    private setupMiddleware(): void {
        // this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private setupRoutes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        const router = express.Router();
        // placeholder route handler
        router.get('/maps', (req, res, next) => {
            console.log(req.params);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(getMaps());
            return next();
            // res.json({
            //     message: 'Hello World!'
            // });
        });

        router.get('/maps/:mapFile', (req, res, next) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Content-Type', 'text/plain');
            res.send(getMap(req.params.mapFile));
            return next();
            // res.json({
            //     message: 'Hello World!'
            // });
        });

        router.get('/maps/:mapFile/intersections', (req, res, next) => {
            res.set('Access-Control-Allow-Origin', '*');
            // res.set('Content-Type', 'text/plain');
            const data = getMap(req.params.mapFile);
            if (!data) {
                res.send('ERROR, no data');
                return next();
            }
            const rsls = data.split(/\r?\n/).filter(l => l !== '').map(l => {
                return RoadSegmentLine.CreateFromString(l);
            });
            const graph = new GeoGraph();
            const rsmd = new RoadSegmentMetaData(rsls);
            rsmd.buildMetaWithGeoGraph(graph);
            console.log('settting state', rsmd.intersections);
            res.json(rsmd.intersections);
            return next();
            // res.json({
            //     message: 'Hello World!'
            // });
        });

        this.express.use('/', router);
    }

}

export default new App().express;
