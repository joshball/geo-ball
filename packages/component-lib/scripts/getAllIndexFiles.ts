import { readdirSync, lstatSync } from 'fs';
import { resolve, join, dirname, basename } from 'path';

// First:
// Get all Directories and index files:

// const getDirAndIndexFile = (path: string) => {};
export const flatten = (array: Array<any>): Array<any> => {
    return array.reduce(
        (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr),
        []
    );
};

interface IFileContent {
    isDir: boolean;
    name: string;
    path: string;
}
const findAllIndexFiles = (path: string): Array<string> => {
    const isDir = lstatSync(path).isDirectory();
    console.log('FAI path:', path);
    if (!isDir) {
        return [];
    }
    const dirContents = readdirSync(path).map(f => {
        const subFilePath = resolve(join(path, f));
        return {
            isDir: lstatSync(subFilePath).isDirectory(),
            name: f,
            path: subFilePath,
        } as IFileContent;
    });

    const subIndexes: Array<string> = flatten(
        dirContents.filter(x => x.isDir).map(x => findAllIndexFiles(x.path))
    );
    console.log('FAI subIndexes:', subIndexes);

    const localIndex = dirContents.find(
        x => !x.isDir && x.name.indexOf('index.') === 0
    );
    console.log('dirContents:', dirContents.map(x => x.name));
    // console.log('dirContents:', dirContents);
    if (localIndex) {
        console.log('FAI localIndex:', localIndex);
        subIndexes.push(localIndex.path);
    }
    return subIndexes;
};

export const getAllIndexFiles = (path: string): Array<string> => {
    const isDir = lstatSync(path).isDirectory();
    if (!isDir) {
        throw new Error(`${path} is not a dir?`);
    }
    const allIndexFiles = findAllIndexFiles(path);
    console.log('\n\nall:');
    console.log(allIndexFiles.map(f => f.slice(path.length)));
    console.log(allIndexFiles.length);
    return allIndexFiles;
};

// ATOMS
// $ w:\bin\find . -name index.ts
// ./Button/index.ts
// ./Heading/index.ts
// ./index.ts
// ./Placeholder/index.ts

// [ 'Button\\index.ts',
//   'Heading\\index.ts',
//   'Placeholder\\index.ts',
//   'atoms\\index.ts' ]

// components
// ./atoms/Button/index.ts
// ./atoms/Heading/index.ts
// ./atoms/index.ts
// ./atoms/Placeholder/index.ts
// ./index.ts
// ./molecules/index.ts
// ./organisms/ActionBar/index.ts
// ./organisms/ActionButton/index.ts
// ./organisms/ActionToggle/index.ts
// ./organisms/index.ts
// ./panels/ApiBrowser/index.ts
// ./panels/index.ts
// ./templates/index.ts
// ./themes/index.ts
