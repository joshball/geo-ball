// import { join, resolve } from 'path';
import { Command, flags } from '@oclif/command'
import { OpenStreetmapFile } from '@geo-ball/osm-data';
import {
    RoadSegmentsFile,
    OutputFormats,
    OutputFormatExtensions,
    OutputFormatType,
    // resolveDataDir,
    // resolveOsmFiles,
    // resolveOsmAndRsdFiles,
    UcsdDataFiles

} from '@geo-ball/ucsd-core';
// import { LatLngBounds } from '@geo-ball/geo-core';
// import { OverpassHighwayFile, ConvertToRoadSegmentsMap, RoadSegmentsFile, OpenStreetmapFile } from '@geo-ball/ucsd-core';
import { resolve, join, basename, dirname, extname } from 'path';
import { existsSync } from 'fs';
// import { OutputArgs, OutputFlags } from '@oclif/parser';
// import { writeFileSync, readFileSync, existsSync } from 'fs';
// import { OverpassHighways, LatLngBounds, LatLng, IHighwayElement } from '@geo-ball/osm-data';
// import { AxiosResponse } from 'axios';
// import { BaseDataPath, RelDownloadDir } from '../defaults';
// import { findFilePath } from '../common';
import { OutputArgs, OutputFlags } from '@oclif/parser';
// import { OSMDataPath } from '../common/defaults';
// import { OutputArgs } from '@oclif/parser';
// import { dataDir } from '../../../ucsd-core/src/test/TestData';


const FormatOptions = OutputFormats.concat('both');
class GenerateRsdFileFromOsmDataCommand extends Command {

    static description = 'Generates RSD (Road Segment Data) Files from OSM (OpenStreetMap) data files'

    static examples = [
        '$ ucsd-cli generate:rsd --all',
        '$ ucsd-cli generate:rsd osmDataFile',
        '$ ucsd-cli generate:rsd osmDataFile --out alternative-rsd-path',
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        format: flags.string({ char: 'f', description: `Output format (${FormatOptions})`, options: FormatOptions, default: 'json' }),
        dataDir: flags.string({ char: 'd', description: `Data Directory` }),
        // format: formatFlag(),
        overwrite: flags.boolean({ char: 'o' }),
    }

    static args = [
        { name: 'osmDataFile', description: 'OSM Data file', required: false },
    ]

    args!: OutputArgs<any>;
    flags!: OutputFlags<any>;

    async run() {
        const parsed = this.parse(GenerateRsdFileFromOsmDataCommand);
        this.args = parsed.args;
        this.flags = parsed.flags;

        const overwriteRsFiles = this.flags.overwrite === true;

        const dataFiles = new UcsdDataFiles(this.flags.dataDir);
        const osmFiles = dataFiles.getOsmBasedFilePaths(this.args.osmDataFile);
        console.log('osmFiles', osmFiles)
        // const dataDir = resolveDataDir(this.flags.dataDir);
        // const osmFiles = resolveOsmFiles(dataDir, this.args.osmDataFile);
        // const osmRsdFiles = resolveOsmAndRsdFiles(dataDir, osmFiles, overwriteRsFiles);

        osmFiles.forEach(orf => {
            console.log('-------------------------------------------------')
            console.log('OSM:', orf.osmFilePath)
            console.log('RSD:', orf.rsdJsonFilePath);
            if(!overwriteRsFiles && (orf.rsdJsonFilePath.exists || orf.rsdTextFilePath.exists)){
                throw new Error(`RSD file exists. Use overwrite! ${orf.rsdJsonFilePath.path}`);
            }
            const osmFile = OpenStreetmapFile.LoadSync(orf.osmFilePath.path);
            console.log('-------------------------------------------------')
            const osmElements = osmFile.getElements();
            const osmStats = osmElements.getStats();
            console.log('osmStats', JSON.stringify(osmStats, undefined, 4));
            console.log('osmFile bounds:', osmFile.osmMetaData.osmQuery.latLngBounds.toString());

            const rsf = RoadSegmentsFile.CreateFromOsm(osmFile);

            console.log('RSF segmentsData.length:', rsf.segmentsData.length);
            RoadSegmentsFile.SaveJsonFile(orf.rsdJsonFilePath.path, rsf);
            RoadSegmentsFile.SaveTextFile(orf.rsdTextFilePath.path, rsf);

            const rsfJson = RoadSegmentsFile.Load(orf.rsdJsonFilePath.path);
            console.log('Loaded RSF metaData:', rsfJson.metaData);
            console.log('Loaded RSF Json with len:', rsfJson.segmentsData.length);
        })
        // const { osmDataFilePath, rsTextPath, rsJsonPath } = this.getFilePaths(overwriteRsFiles);


        // const osmFile = OpenStreetmapFile.LoadSync(osmDataFilePath);
        // const osmElements = osmFile.getElements();
        // const osmStats = osmElements.getStats();
        // console.log('osmStats', JSON.stringify(osmStats, undefined, 4));

        // console.log('osmFile bounds:', osmFile.osmMetaData.osmQuery.latLngBounds.toString());

        // const rsf = new RoadSegmentsFile.CreateFromOsm(osmFile);

        // const results = ConvertToRoadSegmentsMap(highwayFile.data, highwayFile.bounds);
        // const rsf = new RoadSegmentsFile(highwayFile.bounds, highwayFile.timestamp, results);
        // console.log('RSF lines:', rsf.data.length);
        // RoadSegmentsFile.saveJsonFile(roadLinesJsonFilePath, rsf)
        // RoadSegmentsFile.saveTextFile(roadLinesTextFilePath, rsf)
        this.exit(0);
    }

	/**
	 * This method cleans up the args/flags, and returns the paths
	 * of the files needed to do the conversion.
	 */
    // getFilePaths(overwriteRsFiles: boolean = false) {
    //     const osmDataFilePath = this._resolveOsmFile();

    //     // Grab the path to the road segment TEXT and JSON files
    //     const rsTextPath = this._resolveRoadSegmentFileName('text', osmDataFilePath, overwriteRsFiles);
    //     const rsJsonPath = this._resolveRoadSegmentFileName('json', osmDataFilePath, overwriteRsFiles);

    //     return { osmDataFilePath, rsTextPath, rsJsonPath };
    // }

	/**
	 * Resolve the OSM data file path from the args, and ensure it exists
	 */
    // private _resolveOsmFile() {
    //     // Grab the OSM Data file and make sure it exists
    //     let osmDataFilePath = resolve(this.args.osmDataFile);
    //     console.log('osmDataFile', osmDataFilePath);
    //     if (existsSync(osmDataFilePath)) {
    //         return osmDataFilePath;
    //     }

    //     osmDataFilePath = resolve(join(OSMDataPath, this.args.osmDataFile));
    //     console.log('__dirname', __dirname)
    //     console.log('OSMDataPath', OSMDataPath)
    //     console.log('osmDataFilePath', osmDataFilePath)
    //     if (!existsSync(osmDataFilePath)) {
    //         throw new Error('OSM Data file required');
    //     }
    //     process.exit();
    //     return osmDataFilePath;
    // }

	/**
	 * This function takes a format type (json or text) and will return
	 * @param  {string} formatType string - the format of the file, either `json` or `txt`
	 * @param  {string} osmDataFilePath - If provided, the path used to check
	 */
    private _getRoadSegmentFileName(formatType: OutputFormatType, osmDataFilePath: string): string | undefined {
        // if (flags.format === 'both' && args.roadSegementsFile) {
        // 	throw new Error(`You cannot specify two formats and `)
        const ONLY_ONE_FORMAT = this.flags.format !== 'both';
        const SHOULD_WE_CREATE_THIS_FORMAT = this.flags.format === formatType || this.flags.format === 'both';
        const WAS_FILENAME_PROVIDED = this.args.roadSegementsFile;
        const VALID_EXTENSIONS: Array<string> = Object.keys(OutputFormatExtensions).map((key: string) => `.OutputFormatExtensions[${key}]`);
        const PROVIDED_FILENAME_EXTENSION = this.args.roadSegementsFile && extname(this.args.roadSegementsFile);
        const HAS_JSON_OR_TXT_EXTENSION = VALID_EXTENSIONS.some((ext: string) => PROVIDED_FILENAME_EXTENSION === ext);

        if (!SHOULD_WE_CREATE_THIS_FORMAT) {
            return;
        }

        const extension = OutputFormatExtensions[formatType];
        const ending = `.road-segs.${extension}`;

        if (!WAS_FILENAME_PROVIDED()) {
            // return the OSM name with either a txt or json extension
            return resolve(join(dirname(osmDataFilePath), basename(osmDataFilePath).replace('.osm-data.json', ending)));
        }

        // OK, so now we have a filename. The tricky part here is if they asked for TWO formats, but gave
        // one filename. So first, lets handle the easier case (just one format), and ignore the extensions
        if (ONLY_ONE_FORMAT) {
            return resolve(this.args.roadSegementsFile);
        }

        // Finally, we need to handle the more complicated case where we have to deal with multipel files
        // and extensions. To make this simpler, lets just assert that they should not have a .json or .txt
        // exentsion, so we can add it.
        if (HAS_JSON_OR_TXT_EXTENSION) {
            throw new Error(`If you are providing a filename and multiple formats, make sure filename does not end in [${VALID_EXTENSIONS}]`);
        }

        // OK, now we can just return with te correct extension;
        return resolve(this.args.roadSegementsFile + extension);
    }

	/**
	 * This function takes a format type (json or text) and will return
	 * @param  {string} formatType string - the format of the file, either `json` or `txt`
	 * @param  {string} osmDataFilePath - If provided, the path used to check
	 * @param  {boolean} [overwriteRsFiles=false] - if file exists, will throw if not set to true
	 */
    private _resolveRoadSegmentFileName(formatType: OutputFormatType, osmDataFilePath: string, overwriteRsFiles: boolean): string | undefined {
        const roadSegmentsFileName = this._getRoadSegmentFileName(formatType, osmDataFilePath);
        if (roadSegmentsFileName && !overwriteRsFiles && existsSync(roadSegmentsFileName)) {
            throw new Error('Road Segments File exists (use overwrite if needed');
        }
        return roadSegmentsFileName;
    }

}
export default GenerateRsdFileFromOsmDataCommand;

