// const publicFiles = require("./getPublicFiles");
// console.log('publicFiles:', publicFiles);

// const rimraf = require('rimraf');
const { lstatSync } = require('fs');
const { join } = require('path');
const getModules = require('./get-modules');

const ROOT = '../src/components';

const createProxies = () => {
    const modules = getModules();
    modules.forEach(module => {
        let proxyPath = join('./', module);
        const isFile = lstatSync(join(__dirname, ROOT, module)).isFile();
        if (isFile) {
            proxyPath = proxyPath.replace(/\.js$/, '');
        }
        console.log('WOULD REMOVE:', proxyPath)
        //   rimraf.sync(proxyPath);
    });
};

module.exports = createProxies();
