import { join, resolve, extname } from 'path';
import { Command, flags } from '@oclif/command';
// const BG = require('@geo-ball/osm-data');
// console.log(BG.FO);

// import { OverpassHighways, LatLngBounds, LatLng, IHighwayElement } from '@geo-ball/osm-data';
// import { RoadSegmentsFile, OverpassHighwayFile } from '@geo-ball/osm-data';
import { OpenStreetmapFile } from '@geo-ball/osm-data';
// import { BaseDataPath, RelDownloadDir } from '../common/defaults';
import { findFilePath } from '../common/fileHelpers';

class Stats extends Command {
    static description = 'Get stats for a data file';

    static examples = ['$ cli stats'];

    static flags = {
        help: flags.help({ char: 'h' }),
        osmDataFile: flags.string({
            char: 'o',
            description: 'OSM Data JSON file',
            required: false,
        }),
        // roadSegementsFile: flags.string({ char: 'r', description: 'Road Line file for UCSD Graph', required: false }),
    };

    isJson = (filename: string) => extname(filename).toLowerCase() === '.json';

    async run() {
        // tslint:disable-next-line:no-shadowed-variable
        const { flags } = this.parse(Stats);

        // console.log('flags:', JSON.stringify(flags, undefined, 4))

        if (flags.osmDataFile) {
            const osmDataFile = findFilePath(flags.osmDataFile);
            console.log('overpassHighwaysFile', osmDataFile);

            // const rsd = OverpassHighwayFile.loadJsonFile(overpassHighwaysFile)
            const osmFile = OpenStreetmapFile.LoadSync(osmDataFile);

            const elements = osmFile.getElements();
            const stats = elements.getStats();
            console.log('overpassHighwaysFile stats', JSON.stringify(stats, undefined, 4));
        } else {
            this.error('You did not choose a file');
            this.exit(-1);
        }

        // if (flags.roadSegementsFile) {

        //     const roadSegementsFile = findFilePath(flags.roadSegementsFile);
        //     console.log('Loading roadSegementsFile:', roadSegementsFile);

        //     const rsd = this.isJson(roadSegementsFile)
        //         ? RoadSegmentsFile.loadJsonFile(roadSegementsFile)
        //         : RoadSegmentsFile.loadTextFile(roadSegementsFile);
        //     const stats = rsd.getStats();
        //     console.log('roadLinesFileData stats', JSON.stringify(stats, undefined, 4));

        //     // const graph: IGraph = new GraphAdjList();
        //     // rsd.loadGraph(graph);
        // }

        // We normally create a graph from data in a file. We use a graph loader to do this:
        // const graph = new GraphAdjList();
        // const graph = GraphLoader<IRoadSegmentsFile>(roadSegementsFile);
        // We have to load graph data from serveral types of files:
        // - OverpassHighway File { [nodes|ways] }
        // - RoadSegments File { [start, end, name, type] }
        // - GraphDefinition File {vertexCount, [edge pairs]}

        // The data for each file is provided raw with the following APIs:
        //  const data: IRoadSegmentsFile = LoadData.fromRoadSegementsFile(filePath);
        //  const data: IOverpassHighwayFile = LoadData.fromOverpassHighwayFile(filePath);
        //  const data: IGraphDefinitionFile = LoadData.fromGraphDefinitionFile(filePath);

        // Given a Road Segment query within bounds X that returns Y Road Segments,
        // each with two points (Start, End), for a total of m Points. Because a Road
        // Segment can have a point within bounds X and outside of bounds X, there will
        // exist n >= 0 points that are outside of the bounds.
        // Although these points are outside the bounds of the query, they may still be
        // required to find an angle of a road, or potentially include useful data
        // (detours, speed limits). However, these points should not be included as
        // intersections, or verticies in path calculations. Therefore we create a function
        // to clip these out of the set of all points for graph insertions.

        // Then we can generate a graph from it:
        // OverpassHighway Files:
        // Fetch a Highway File with Bounds
        // Save a Highway File with Fetch and Bounds info as JSON
        // Load a Highway File with Fetch and Bounds info from JSON

        // RoadSegments Files (StartEndNameType)
        // Load a RoadSegments File as lines of start, end, "street", type
        // Save a RoadSegments File as lines of start, end, "street", type
        // Save a RoadSegments File with Highway File, Fetch and Bounds info as JSON
        // Load a RoadSegments File with Highway File, Fetch and Bounds info from JSON

        // Intersection File (Start,End)
        // Load an Intersection File with Fetch and Bounds info from JSON
    }
}
export default Stats;
