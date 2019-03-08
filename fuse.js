const {
    FuseBox,
    JSONPlugin,
    CSSPlugin,
    EnvPlugin,
    SassPlugin,
    QuantumPlugin,
    WebIndexPlugin,
    ImageBase64Plugin,
} = require('fuse-box');
//   const parseArgs    = require('minimist');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');
//   const compression  = require('compression');
//   const options      = parseArgs(process.argv.slice(2));
const options = {};
const isProduction = !!options.production || !!options.p;

const fuse = FuseBox.init({
    cache: false,
    hash: false,
    homeDir: './',
    output: 'build/$name.js',
    sourceMaps: { app: true, vendor: true },
    target: 'browser@esnext',
    useJsNext: true,
    useTypescriptCompiler: true,
    alias: {
        // "@geo-ball/component-lib": "~packages/component-lib",
        '@geo-ball/geo-core': '~packages/geo-core',
        // "@geo-ball/graph-core": "~packages/graph-core",
        // "@geo-ball/osm-cli": "~packages/osm-cli",
        // "@geo-ball/osm-data": "~packages/osm-data",
        // "@geo-ball/ucsd-app": "~packages/ucsd-app",
        // "@geo-ball/ucsd-cli": "~packages/ucsd-cli",
        // "@geo-ball/ucsd-core": "~packages/ucsd-core",
        '@geo-ball/utils': '~packages/utils',
    },
    plugins: [
        JSONPlugin(),
        EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
        CSSPlugin(),
        [SassPlugin(), CSSPlugin()],
        //   WebIndexPlugin({title: 'WorkSight .Next',  path: './', template: 'examples/src/index.html', target: 'index.html' }),
        ImageBase64Plugin({ useDefault: true }),
        isProduction && QuantumPlugin({ target: 'browser', uglify: { keep_fnames: true }, treeshake: true }),
    ],
    experimentalFeatures: true,
});

rimraf.sync('build');

function runDevelopmentServer() {
    fuse.dev({ root: 'build/', port: 3000 }, server => {
        const app = server.httpServer.app;
        app.use(compression());
        const dist = path.resolve('./build');

        function sendFile(req, res) {
            let url = req.url
                .split('#')
                .shift()
                .split('?')
                .shift()
                .split('/')
                .pop();
            const p = path.join(dist, url);
            // const p = path.join(dist, req.url);
            if (fs.existsSync(p)) {
                return res.sendFile(p);
            }
            return res.sendStatus(200);
        }

        app.get('*.js', function(req, res) {
            sendFile(req, res);
        });
        app.get('*.js.map', function(req, res) {
            sendFile(req, res);
        });
        app.get('*', function(req, res) {
            res.sendFile(path.join(dist, 'index.html'));
        });
    });
}

if (isProduction) {
    console.log('Production build detected!');
    if (options.s) {
        runDevelopmentServer();
    }
    fuse.bundle('vendor').instructions('~ examples/src/main.ts');
    fuse.bundle('app').instructions('!> [examples/src/main.ts]');
} else {
    runDevelopmentServer();
    fuse.bundle('vendor').instructions('~ examples/src/main.ts');
    fuse.bundle('app')
        .watch('packages/**|examples/src/**')
        .instructions('!> [examples/src/main.ts]')
        .hmr();
}

fuse.run();
