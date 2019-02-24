// const path = require('path');
// const glob = require('glob');

// module.exports = {
//     components: function () {
//         return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
//             .filter(function (module) {
//                 return /\/[A-Z]\w*\.tsx$/.test(module);
//             });
//     },
//     resolver: require('react-docgen').resolver.findAllComponentDefinitions,
//     propsParser: require('react-docgen-typescript').withDefaultConfig({
//         propFilter: {
//             skipPropsWithoutDoc: true
//         }
//     }).parse
// };

const glob = require("glob");
const path = require("path");
const fs = require("fs");

module.exports = {
    title: 'geo-ball',
    sections: [
        // {
        //     name: 'Introduction',
        //     content: 'docs/introduction.md'
        // },
        // {
        //     name: 'Atomic Design',
        //     content: 'docs/atomic-design.md'
        // },
        // {
        //     name: 'Style Guide Notes',
        //     content: 'docs/style-guide-notes.md'
        // },
        // {
        //     name: 'API Browser',
        //     content: 'docs/api-browser.md',
        //     components: 'src/components/ApiBrowser/*.tsx',
        //     exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
        //     usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        // },
        {
            name: 'Atoms',
            // content: 'src/components/atoms/primitives.md',
            components: 'src/components/atoms/**/*.tsx',
            exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        },
        // {
        //     name: 'Primitives',
        //     content: 'src/components/atoms/primitives.md',
        //     components: 'src/components/atoms/primitives.tsx',
        //     exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
        //     usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        // },
        // {
        //     name: 'UI Components',
        //     // content: 'docs/ui.md',
        //     components: 'src/components/**/*.tsx',
        //     exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
        //     usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
        // }
        // {
        //     name: 'Documentation',
        //     sections: [{
        //             name: 'Installation',
        //             content: 'docs/installation.md',
        //             description: 'The description for the installation section'
        //         },
        //         {
        //             name: 'Configuration',
        //             content: 'docs/configuration.md'
        //         },
        //         {
        //             name: 'Live Demo',
        //             external: true,
        //             href: 'http://example.com'
        //         }
        //     ]
        // },
    ],
    moduleAliases: {
        'rsg-example': path.resolve(__dirname, 'src'),
    },
    components: () => {
        return glob.sync("src/components/**/*.{ts,tsx}")
        // return glob.sync("src/components/atoms/**/*.tsx")
        //     .filter(file => {
        //         // Take only connect component if exists, ignore others.
        //         if (file.match(/connect.tsx$/)) {
        //             return true
        //         } else {
        //             const pathObject = path.parse(file);
        //             pathObject.ext = `.connect${pathObject.ext}`
        //             const {
        //                 root,
        //                 dir,
        //                 ext,
        //                 name
        //             } = pathObject;
        //             return !fs.existsSync(path.format({
        //                 root,
        //                 dir,
        //                 ext,
        //                 name
        //             }));
        //         }
        //     });
    },
    propsParser: require("react-docgen-typescript").parse,
    webpackConfig: Object.assign({}, require("./webpack.config"), {}),
    // styleguideComponents: {
    //     Wrapper: __dirname + "/src/styleguide/Wrapper.tsx",
    // },
    styleguideDir: "docs",
};
