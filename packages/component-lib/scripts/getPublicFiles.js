const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const removeExt = file => file.replace(/\.[^.]+$/, '');

const isDirectory = source => lstatSync(source).isDirectory();

const getIndex = dir => join(dir, readdirSync(dir).find(file => /^index/.test(file)));

const getFiles = dir =>
    readdirSync(dir)
        .filter(file => !/^_/.test(file))
        .reduce((acc, file) => {
            console.log('REDUCE:');
            const path = join(dir, file);
            console.log('path:', path);
            console.log('isDirectory:', isDirectory(path));
            if (isDirectory(path)) {
                // getFiles(path);
                console.log('getIndex:', getIndex(path));
            }
            const finalPath = isDirectory(path) ? getIndex(path) : path;
            console.log('finalPath:', finalPath);
            return {
                ...acc,
                [removeExt(file)]: finalPath,
            };
        }, {});

module.exports = getFiles(join(__dirname, '../src/components/atoms'));
