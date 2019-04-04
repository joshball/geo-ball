// // import { FuseBox, CSSModules, CSSPlugin, SassPlugin, Sparky, CopyPlugin, ReplacePlugin } from "fuse-box"
// import { FuseBox, CSSPlugin, SassPlugin, Sparky, CopyPlugin, ReplacePlugin } from 'fuse-box';
// import { spawn } from 'child_process';
// import * as pjson from './ucsd-app/package.json';
// import { resolve, join } from 'path';

// const DEV_PORT = 4445;
// const UCSD_APP = 'ucsd-app';
// const UCSD_APP_OUT_DIR = `${UCSD_APP}/out`;
// const UCSD_APP_SRC_DIR = `${UCSD_APP}/src`;
// const UCSD_APP_PATH = resolve(join(__dirname, UCSD_APP));

// const COMP_LIB = 'component-lib';
// const COMP_LIB_OUT_DIR = `${COMP_LIB}/build`;
// const COMP_LIB_SRC_DIR = `${COMP_LIB}/src`;

// const ASSETS = ['*.jpg', '*.png', '*.jpeg', '*.gif', '*.svg'];

// // are we running in production mode?
// const isProduction = process.env.NODE_ENV === 'production';

// // copy the renderer's html file into the right place
// Sparky.task('copy-html', () => {
//     // return Sparky.src("src/main/index.html").dest(`${OUTPUT_DIR}/$name`)
//     return Sparky.src(`${UCSD_APP_SRC_DIR}/main/*.html`).dest(`${UCSD_APP_OUT_DIR}/$name`);
// });

// // the default task
// Sparky.task('default', ['copy-html'], () => {
//     // setup the producer with common settings
//     const fuse = FuseBox.init({
//         homeDir: '.',
//         // output: `${UCSD_APP_OUT_DIR}/$name.js`,
//         output: 'ucsd-app/out/$name.js',
//         target: 'electron',
//         log: isProduction,
//         cache: !isProduction,
//         sourceMaps: true,
//         debug: true,
//         alias: {
//             hack: `${COMP_LIB_OUT_DIR}/index.js`,
//         },
//         tsConfig: 'ucsd-app/tsconfig.json',
//     });

//     // start the hot reload server
//     if (!isProduction) {
//         fuse.dev({ port: DEV_PORT, httpServer: false });
//     }

//     // bundle the electron main code
//     const mainBundle = fuse
//         .bundle('main')
//         .target('server')
//         // .instructions(`> [${UCSD_APP_SRC_DIR}/main/main.ts]`)
//         .instructions('> [ucsd-app/src/main/main.ts]')
//         // inject in some configuration
//         .plugin(
//             ReplacePlugin({
//                 'process.env.HOMEPAGE': pjson.homepage ? `"${pjson.homepage}"` : 'null',
//             }),
//         );

//     // and watch unless we're bundling for production
//     if (!isProduction) {
//         mainBundle.watch();
//     }

//     // bundle the electron renderer code
//     const rendererBundle = fuse
//         .bundle('ui-renderer')
//         // .instructions(`> [${UCSD_APP_SRC_DIR}/ui/app/index.tsx] +fuse-box-css`)
//         .instructions('> [ucsd-app/src/ui/app/index.tsx] +fuse-box-css')
//         .plugin(SassPlugin())
//         // .plugin(CSSResourcePlugin({ dist: "dist/css-resources" }))
//         .plugin(CSSPlugin())
//         .plugin(
//             CopyPlugin({ useDefault: false, files: ASSETS, dest: 'assets', resolve: 'assets/' }),
//         );

//     const backgroundBundle = fuse
//         .bundle('background-renderer')
//         .instructions(`> [${UCSD_APP_SRC_DIR}/background/index.ts]`);

//     // and watch & hot reload unless we're bundling for production
//     if (!isProduction) {
//         rendererBundle.watch();
//         rendererBundle.hmr();
//         backgroundBundle.watch();
//         backgroundBundle.hmr();
//     }
//     console.log('AAAA');

//     // when we are finished bundling...
//     return fuse
//         .run()
//         .then(() => {
//             console.log('BBB');
//             if (!isProduction) {
//                 // startup electron
//                 console.log('UCSD_APP_PATH:');
//                 console.log('UCSD_APP_PATH:', UCSD_APP_PATH);
//                 spawn('node', [`${UCSD_APP_PATH}/node_modules/electron/cli.js`, UCSD_APP_PATH], {
//                     stdio: 'inherit',
//                 }).on('exit', code => {
//                     console.log(`electron process exited with code ${code}`);
//                     process.exit(code || 0);
//                 });
//             }
//         })
//         .catch(e => console.error(e));
// });
