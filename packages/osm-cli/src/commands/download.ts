import { Command, flags } from '@oclif/command';
import { LatLngBounds, LatLng } from '@geo-ball/geo-core';
import { LocalDateTime } from '@geo-ball/utils';
import {
    OpenStreetmapDownloader,
    OpenStreetmapFileMetaData,
    IFetchAndSaveResult,
    OpenStreetmapQuery,
    GeographicBoundsDescription,
    IOpenStreetmapFileMetaData,
    IGeographicBoundsDescription,
} from '@geo-ball/osm-data';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { QueryConfigFile } from '../common/QueryConfigFile';

class Download extends Command {
    static description = 'download data files';

    static examples = [
        '$ cli download queryFile',
        '$ cli download --bounds 40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137',
    ];

    static flags = {
        help: flags.help({ char: 'h' }),
    };

    static args = [
        {
            name: 'queryFile', // name of arg to show in help and reference with args[name]
            required: true, // make the arg required with `required: true`
            description: 'Query file used for OSM query', // help description
            hidden: false, // hide this arg from help
        },
    ];

    async run() {
        const { args } = this.parse(Download);

        const queryCfgFile = QueryConfigFile.Load(args.queryFile);
        const originalFilePath = '';
        const queryName = 'CLI.queryName';
        const queryDesc = 'CLI.queryDesc';
        const osmArgs = queryCfgFile.getOsmDownloadArgs();
        const geoBoundsData: IGeographicBoundsDescription = {
            date: LocalDateTime.Now(),
            name: queryName,
            description: queryDesc,
            latLngBoundsArea: osmArgs.osmQuery.latLngBounds,
            address: '123 State St, Salt Lake City, UT 8401',
            geocodedAddress: '123 State St, Salt Lake City, UT 8401',
        };
        const geoBounds = new GeographicBoundsDescription(geoBoundsData);
        const osmMeta: IOpenStreetmapFileMetaData = {
            osmServer: osmArgs.osmEndpoint || OpenStreetmapDownloader.DEFAULT_ENDPOINT,
            osmQuery: new OpenStreetmapQuery(osmArgs.osmQuery),
            queryDate: LocalDateTime.Now(),
            geoBounds,
            originalFilePath,
        };

        // osmArgs.osmEndpoint
        OpenStreetmapDownloader.FetchAndSave(osmMeta, osmArgs.resultsFileName, osmArgs.overwrite)
            .then((results: IFetchAndSaveResult) => {
                console.log('Download Complete:');
                console.log('  SERVER:', results.osmDataFile.osmMetaData.osmServer);
                console.log('    DATE:', results.osmDataFile.osmMetaData.queryDate);
                console.log('    FILE:', results.osmDataFilePath);
            })
            .catch(error => {
                console.error(
                    '###################################################################################',
                );
                console.error('DOWNLOAD FAILED:');
                console.error(error);
                console.error(
                    '###################################################################################',
                );
                throw error;
            });
    }
}
export default Download;
