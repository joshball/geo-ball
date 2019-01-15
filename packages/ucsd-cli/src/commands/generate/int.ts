// import { join, resolve } from 'path';
// import { join, resolve } from 'path';
import { Command, flags } from '@oclif/command'
import { OpenStreetmapFile } from '@ball-maps/osm-data';
import {
    RoadSegmentsFile,
    OutputFormats,
    OutputFormatExtensions,
    OutputFormatType,
    // resolveDataDir,
    // resolveOsmFiles,
    // resolveOsmAndRsdFiles,
    UcsdDataFiles,
    PointMapsFile,
    IntersectionsFile

} from '@ball-maps/ucsd-core';
// import { LatLngBounds } from '@ball-maps/geo-core';
// import { OverpassHighwayFile, ConvertToRoadSegmentsMap, RoadSegmentsFile, OpenStreetmapFile } from '@ball-maps/ucsd-core';
import { resolve, join, basename, dirname, extname } from 'path';
import { existsSync } from 'fs';
// import { OutputArgs, OutputFlags } from '@oclif/parser';
// import { writeFileSync, readFileSync, existsSync } from 'fs';
// import { OverpassHighways, LatLngBounds, LatLng, IHighwayElement } from '@ball-maps/osm-data';
// import { AxiosResponse } from 'axios';
// import { BaseDataPath, RelDownloadDir } from '../defaults';
// import { findFilePath } from '../common';
import { OutputArgs, OutputFlags } from '@oclif/parser';
// import { OSMDataPath } from '../common/defaults';
// import { OutputArgs } from '@oclif/parser';
// import { dataDir } from '../../../ucsd-core/src/test/TestData';


const FormatOptions = OutputFormats.concat('both');
class GenerateIntersectionsFileCommand extends Command {

    static description = 'Generates INT (intersections) files from RSD (Road Segment Data) Files'

    static examples = [
        '$ ucsd-cli generate:int --all',
        '$ ucsd-cli generate:int roadSegmentsFile',
        '$ ucsd-cli generate:int roadSegmentsFile --out alternative-int-file-path',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        dataDir: flags.string({ char: 'd', description: `Map Data Directory` }),
        out: flags.string({ char: 'o', description: `Alternative path to int file to generate` }),
        overwrite: flags.boolean({ char: 'o' }),
    }

    static args = [
        { name: 'roadSegementsFile', description: 'Road Segments file for UCSD Graph', required: false },
    ]

    args!: OutputArgs<any>;
    flags!: OutputFlags<any>;

    async run() {
        const parsed = this.parse(GenerateIntersectionsFileCommand);
        this.args = parsed.args;
        this.flags = parsed.flags;

        const overwriteRsFiles = this.flags.overwrite === true;

        const dataFiles = new UcsdDataFiles(this.flags.dataDir);
        const osmFiles = dataFiles.getOsmBasedFilePaths(this.args.osmDataFile);
        // console.log('osmFiles', JSON.stringify(osmFiles, undefined, 4))
        // const dataDir = resolveDataDir(this.flags.dataDir);
        // const osmFiles = resolveOsmFiles(dataDir, this.args.osmDataFile);
        // const osmRsdFiles = resolveOsmAndRsdFiles(dataDir, osmFiles, overwriteRsFiles);

        osmFiles.forEach(orf => {
            // console.log('-------------------------------------------------')
            // console.log('OSM:', orf.osmFilePath)
            // console.log('INT:', orf.intJsonFilePath);
            if (!overwriteRsFiles && (orf.intJsonFilePath.exists || orf.intTextFilePath.exists)) {
                throw new Error(`INT file exists. Use overwrite! ${orf.intJsonFilePath.path}`);
            }
            const osmFile = OpenStreetmapFile.Load(orf.osmFilePath.path);
            const osmElements = osmFile.getElements();
            const osmStats = osmElements.getStats();
            // console.log('osmStats', JSON.stringify(osmStats, undefined, 4));
            // console.log('osmFile bounds:', osmFile.osmMetaData.osmQuery.latLngBounds.toString());

            const rsdFile = RoadSegmentsFile.CreateFromOsm(osmFile);
            const pointsFile = PointMapsFile.CreateFromRsdFile(rsdFile);
            const intFile = IntersectionsFile.CreateFromPointsFile(pointsFile);
            // pointsFile.dump()
            // console.log(`--------------------------------------------------------------------------------`);
            // console.log('raw:');
            // console.log(pointsFile);
            // console.log(`--------------------------------------------------------------------------------`);
            // console.log('JSON:');
            // console.log(pointsFile.serialize(true));
            // // console.log(JSON.stringify(intFile, undefined, 4));
            // console.log(`--------------------------------------------------------------------------------`);
            console.log('pointsFile.pointsMap.size:', pointsFile.pointsMap.size);
            console.log('intFile.intersections.length:', intFile.intersections.length);
            // console.log(`--------------------------------------------------------------------------------`);
            PointMapsFile.SaveJsonFile(orf.pointsJsonFilePath.path, pointsFile);
            IntersectionsFile.SaveJsonFile(orf.intJsonFilePath.path, intFile);
            // IntersectionsFile.SaveJsonFile(orf.intTextFilePath.path, intFile);

            // const rsfJson = RoadSegmentsFile.LoadFromJsonFile(orf.rsdJsonFilePath.path);
            // console.log('Loaded RSF metaData:', rsfJson.metaData);
            // console.log('Loaded RSF Json with len:', rsfJson.segmentsData.length);
        });
        console.log('EXITING')
        this.exit(0);
    }

}
export default GenerateIntersectionsFileCommand;

