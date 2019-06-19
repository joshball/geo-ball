// import { FuseBox, CSSModules, CSSPlugin, SassPlugin, Sparky, CopyPlugin, ReplacePlugin } from "fuse-box"
import { FuseBox, CSSPlugin, SassPlugin, Sparky, CopyPlugin, ReplacePlugin } from 'fuse-box';
import { spawn } from 'child_process';
import * as pjson from './package.json';

const DEV_PORT = 4448;
const OUTPUT_DIR = 'out';
const ASSETS = ['*.jpg', '*.png', '*.jpeg', '*.gif', '*.svg'];
import { join } from 'path';
function srcPath(subdir: string) {
    const p = join(__dirname, '../component-lib/src', subdir);
    console.log('p', p);
    return p;
}

// are we running in production mode?
const isProduction = process.env.NODE_ENV === 'production';

// copy the renderer's html file into the right place
Sparky.task('copy-html', () => {
    // return Sparky.src("src/main/index.html").dest(`${OUTPUT_DIR}/$name`)
    return Sparky.src('src/main/*.html').dest(`${OUTPUT_DIR}/$name`);
});

// const react = require.resolve('react');
// the default task
Sparky.task('default', ['copy-html'], () => {
    // setup the producer with common settings
    const fuse = FuseBox.init({
        homeDir: 'src',
        output: `${OUTPUT_DIR}/$name.js`,
        target: 'electron',
        log: isProduction,
        cache: !isProduction,
        sourceMaps: true,
        tsConfig: 'tsconfig.json',
        alias: {
            // react,
            // 'CL': srcPath('.'),
            // '@types': srcPath('types'),
            // '@components': srcPath('components'),
            // '@atoms': srcPath('components/atoms'),
            // '@molecules': srcPath('components/molecules'),
            // '@organisms': srcPath('components/organisms'),
            // '@panels': srcPath('components/panels'),
            // '@themes': srcPath('components/themes'),
        },
    });

    // start the hot reload server
    if (!isProduction) {
        fuse.dev({ port: DEV_PORT, httpServer: false });
    }

    // bundle the electron main code
    const mainBundle = fuse
        .bundle('main')
        .target('server')
        .instructions('> [main/main.ts]')
        // inject in some configuration
        .plugin(
            ReplacePlugin({
                'process.env.HOMEPAGE': pjson.homepage ? `"${pjson.homepage}"` : 'null',
            }),
        );

    // and watch unless we're bundling for production
    if (!isProduction) {
        mainBundle.watch();
    }

    // bundle the electron renderer code
    const rendererBundle = fuse
        .bundle('ui-renderer')
        .instructions('> [ui/app/index.tsx] +fuse-box-css')
        .plugin(SassPlugin())
        // .plugin(CSSResourcePlugin({ dist: "dist/css-resources" }))
        .plugin(CSSPlugin())
        .plugin(
            CopyPlugin({ useDefault: false, files: ASSETS, dest: 'assets', resolve: 'assets/' }),
        );

    const backgroundBundle = fuse
        .bundle('background-renderer')
        .instructions('> [background/index.ts]');

    // and watch & hot reload unless we're bundling for production
    if (!isProduction) {
        rendererBundle.watch();
        rendererBundle.hmr();
        backgroundBundle.watch();
        backgroundBundle.hmr();
    }

    // when we are finished bundling...
    return fuse.run().then(() => {
        if (!isProduction) {
            // startup electron
            spawn('node', [`${__dirname}/node_modules/electron/cli.js`, __dirname], {
                stdio: 'inherit',
            }).on('exit', code => {
                console.log(`electron process exited with code ${code}`);
                process.exit(code || 0);
            });
        }
    });
});
