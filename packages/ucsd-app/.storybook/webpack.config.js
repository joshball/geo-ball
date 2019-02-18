const path = require("path")
// module.exports = (baseConfig, env, config) => {

//   config.module.rules.push({
//     test: /\.tsx?$/,
//     loader: "ts-loader",
//     exclude: /node_modules/,
//     include: [path.resolve(__dirname, "..", "src"), path.resolve(__dirname, "views")],
//   })

//   config.resolve.extensions.unshift(".tsx")
//   config.resolve.extensions.unshift(".ts")

//   return config
// }
module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "..", "src"), path.resolve(__dirname, "views")],
        use: [{
            loader: require.resolve('awesome-typescript-loader')
        }, {
            loader: require.resolve('react-docgen-typescript-loader')
        }]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
