import { MapLocation } from './MapLocation';
import { UcsdDataFiles, RoadSegmentsFile, IntersectionsFile } from '@geo-ball/ucsd-core';

export const getIntersectionsEx = (): Promise<Array<MapLocation>> => {
    const intersections = [
        new MapLocation('San Diego (UCSD)', [32.8741164, -117.2382689], 'sd.map'),
        new MapLocation('Salt Lake City', [40.7563038, -111.8781928], 'slc.map'),
        new MapLocation('Santa Barbara', [32.8741164, -117.2382689], 'sb.map'),
        new MapLocation('Seattle', [32.8741164, -117.2382689], 'seattle.map'),
    ];
    return Promise.resolve(intersections);
};

// export const getIntersectionFiles = (): Promise<Array<string>> => {
//     const dataFiles = new UcsdDataFiles();
//     const obfp = dataFiles.getOsmBasedFilePaths();
//     // const osmRsdFiles = dataFiles.resolveOsmAndRsdFiles();
//     return Promise.resolve(obfp.map(f => f.rsdJsonFilePath.path));
// }
export const getRoadSegmentsFiles = (): Promise<any> => {
    // export const getRoadSegmentsFiles = (): Promise<Array<RoadSegmentsFile>> => {
    console.log('getRoadSegmentsFiles');
    const dataFiles = new UcsdDataFiles();
    const obfp = dataFiles.getOsmBasedFilePaths('sugarhouse.2019-01-13_1552.18.osm-data.json');
    console.log('getRoadSegmentsFiles.d', obfp.length);
    // const osmRsdFiles = dataFiles.resolveOsmAndRsdFiles('sugarhouse.2019-01-13_1552.18.osm-data.json');
    return Promise.resolve(obfp.map((f: any) => RoadSegmentsFile.Load(f.rsdJsonFilePath.path)));
};

export const getIntersectionFiles = (): Promise<any> => {
    // export const getIntersectionFiles = (): Promise<Array<IntersectionsFile>> => {
    console.log('getIntersectionFiles');
    const dataFiles = new UcsdDataFiles();
    const obfp = dataFiles.getOsmBasedFilePaths('sugarhouse.2019-01-13_1552.18.osm-data.json');
    console.log('getIntersectionFiles.d', obfp.length);
    return Promise.resolve(obfp.map((f: any) => IntersectionsFile.Load(f.intJsonFilePath.path)));
};
