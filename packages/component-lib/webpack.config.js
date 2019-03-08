const path = require('path');
function srcPath(subdir) {
    return path.join(__dirname, 'src', subdir);
}

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },

    // Enable sourcemaps for debugging webpack"s output.
    devtool: 'source-map',

    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@root': srcPath('.'),
            '@types': srcPath('types'),
            '@components': srcPath('components'),
            '@atoms': srcPath('components/atoms'),
            '@molecules': srcPath('components/molecules'),
            '@organisms': srcPath('components/organisms'),
            '@panels': srcPath('components/panels'),
            '@themes': srcPath('components/themes'),
        },
    },

    module: {
        rules: [
            // All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
    },
};
