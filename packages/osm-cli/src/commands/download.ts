import { Command, flags } from '@oclif/command'
import { LatLngBounds, LatLng } from '@ball-maps/geo-core';
import { OpenStreetmapDownloader, OpenStreetmapQuery, IFetchAndSaveResult } from '@ball-maps/osm-data';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { QueryConfigFile } from '../common/QueryConfigFile';

class Download extends Command {
	static description = 'download data files'

	static examples = [
		'$ cli download queryFile',
		'$ cli download --bounds 40.690856387926516,-111.86356544494627,40.72683597647796,-111.78271293640137'
	]

	static flags = {
		help: flags.help({ char: 'h' }),
	}

	static args = [
		{
			name: 'queryFile',               // name of arg to show in help and reference with args[name]
			required: true,            // make the arg required with `required: true`
			description: 'Query file used for OSM query', // help description
			hidden: false,               // hide this arg from help
		}
	]

	async run() {

		const { args } = this.parse(Download);

		const queryCfgFile = QueryConfigFile.Load(args.queryFile);
		const osmArgs = queryCfgFile.getOsmDownloadArgs();

		const downloader = new OpenStreetmapDownloader(osmArgs.osmEndpoint);
		downloader.fetchAndSave(osmArgs.osmQuery, osmArgs.resultsFileName, osmArgs.overwrite)
			.then((results: IFetchAndSaveResult) => {
				console.log('Download Complete:');
				console.log('  SERVER:', results.osmDataFile.osmServer);
				console.log('    DATE:', results.osmDataFile.queryDate);
				console.log('    FILE:', results.osmDataFilePath);
			})
			.catch(error => {
				console.error('###################################################################################')
				console.error('DOWNLOAD FAILED:')
				console.error(error)
				console.error('###################################################################################')
				throw error;
			});
	}


}
export default Download;
