import { join, dirname, basename, resolve } from "path";

// // let date = new Date();
// // const dateString = date.toISOString();
// // const split = dateString.split('T');
// // // "21:30:05.974Z"
// // // "213005.974Z"
// // let time = split[1].replace(/:/g, '');

// // time = time.substr(0, time.indexOf('.'));
// // time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);

// // console.log(`${split[0]}_${time}`);

// /** Utility function to create a K:V from a list of strings */
// function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
// 	const result = o.reduce((res, key) => {
// 		res[key] = key;
// 		return res;
// 	}, Object.create(null));
// 	console.log('result', result);
// 	return result;
// }

// // function mapEnum<T extends string>(o: any): { [K in T]: K } {
// // 	const res = Object.create(null);
// // 	Object.keys(o).forEach((key) => {
// // 		res[key] = o[key];
// // 	});
// // 	console.log('res', res);
// // 	return res;
// // }

// // export const OutputFormatMap = mapEnum({
// // 	json: 'json',
// // 	text: 'txt',
// // 	both: 'both',
// // });
// export const OutputFormatMap = {
// 	JSON: 'json',
// 	TEXT: 'txt',
// 	BOTH: 'both'
// };

// /** Create a Type */
// type OutputFormatMap = keyof typeof OutputFormatMap;

// console.log(OutputFormatMap)

// let ofm: OutputFormatMap;
// ofm = OutputFormatMap.

// // export const OutputFormatMap = {
// // 	json: 'json',
// // 	text: 'txt',
// // 	both: '',
// // };


// /** Create a K:V */
// const Direction = strEnum([
// 	'North',
// 	'South',
// 	'East',
// 	'West'
// ])
// /** Create a Type */
// type Direction = keyof typeof Direction;

// let sample: Direction;

// sample = Direction.North; // Okay
// sample = 'North'; // Okay
// // sample = 'AnythingElse'; // ERROR!
// import { join, resolve, basename } from 'path';
// import { promises, constants } from 'fs';

// const doIt = async () => {
//     const tmpPath = resolve(join("c:\\tmp\\foobar"))
//     const winPath = resolve(join("c:\\Windows\\System32\\foo"))
//     const path = tmpPath;
//     console.log('checking path:', path)
//     // try {
//     //     const result = await promises.access(path, constants.F_OK | constants.W_OK)
//     //     console.log('result:', result)
//     // }
//     // catch (e) {
//     //     console.error('cannot access', path, e);
//     // }
//     return promises.access(path, constants.F_OK | constants.W_OK)
//         .then(() => path)
//         .catch(() => promises.mkdir(path, { recursive: true }))
//         .then(() => path)
//         .catch((e) => console.error('cannot mkdir', path, e));
// }

// doIt();

export interface IDataDirectory {
    rootPath: string;
    dirName: string;
    fullPath: string;
}
export class DataDirectory {
    rootPath: string;
    dirName: string;

    get fullPath(): string {
        console.log('running fullPath', this.rootPath, this.dirName)
        return `${join(this.rootPath, this.dirName)}`;
    }

    set fullPath(path: string) {
        const { rootPath, dirName } = DataDirectory.GetDataDirectoryFromPath(path);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    constructor(...pathArgs: Array<string>) {
        const { rootPath, dirName } = DataDirectory.GetDataDirectoryFromPath(...pathArgs);
        this.rootPath = rootPath;
        this.dirName = dirName;
    }

    getComponents(): IDataDirectory {
        return {
            rootPath: this.rootPath,
            dirName: this.dirName,
            fullPath: this.fullPath,
        }
    }

    static GetDefaultDataRootPath = () => 'c:\\users\\joshua'
    static GetDefaultDataDirName = () => '.ucsd';

    static GetDataDirectoryFromPath(...pathArgs: Array<string>): IDataDirectory {
        if (!pathArgs || pathArgs.length === 0) {
            const rootPath = DataDirectory.GetDefaultDataRootPath();
            const dirName = DataDirectory.GetDefaultDataDirName();
            return {
                rootPath,
                dirName,
                fullPath: join(rootPath, dirName),
            }
        }
        const fullPath = resolve(join(...pathArgs));
        return {
            rootPath: dirname(fullPath),
            dirName: basename(fullPath),
            fullPath
        }
    }
}



const dump = (name: string, dataDir: IDataDirectory) => {
    console.log('')
    console.log('Dumping', name);
    console.log('dd.dirName:', dataDir.dirName);
    console.log('dd.rootPath:', dataDir.rootPath);
    console.log('dd.fullPath:', dataDir.fullPath);
    console.log('--------------------------------------------------------------')
}

const dd = new DataDirectory();
dump('Original dd', dd)

const x = dd.getComponents();

x.dirName = 'fooooo';
dump('Original dd after manip', dd)
dump('X', x);

