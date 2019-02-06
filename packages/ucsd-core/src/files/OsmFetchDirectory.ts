// export class OsmFetchDirectory {
//     static UCSD_DIRNAME = '.ucsd';
//     static UCSD_OSM_DIRNAME = 'osm';

//     static GetDefaultOsmFetchDirectoryName = () => OsmFetchDirectory.GEOBALL_DIRNAME;
//     static GetDefaultDataRootPath = () => resolve(remote.app.getPath('home'))
//     static GetDefaultDataDirPath = () => join(DataDirectory.GetDefaultDataRootPath(), DataDirectory.GetDefaultDataDirName());

//     static GetDataDirectoryFromPath(...pathArgs: Array<string>): IDataDirectory {
//         if (!pathArgs || pathArgs.length === 0) {
//             const rootPath = DataDirectory.GetDefaultDataRootPath();
//             const dirName = DataDirectory.GetDefaultDataDirName();
//             return {
//                 rootPath,
//                 dirName,
//                 fullPath: join(rootPath, dirName),
//             }
//         }
//         const fullPath = resolve(join(...pathArgs));
//         return {
//             rootPath: dirname(fullPath),
//             dirName: basename(fullPath),
//             fullPath
//         }
//     }
// }
