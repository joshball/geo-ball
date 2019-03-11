import { join } from 'path';
export const BaseDataPath = join(process.cwd(), '../data');
export const RelDownloadDir = 'downloads';
export const SouthWestLat = 32.859375;
export const SouthWestLon = -117.27233;
export const NorthEastLat = 32.902622;
export const NorthEastLon = -117.20367;

if (SouthWestLat >= NorthEastLat) {
    throw new Error('Your SW Lat is more north and your NE Lat');
}
if (SouthWestLon >= NorthEastLon) {
    throw new Error('Your SW Lon is more east and your NE Lon');
}
