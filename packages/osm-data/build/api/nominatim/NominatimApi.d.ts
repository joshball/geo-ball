import { INominatimParams } from "./NominatimParams";
import { INominatimResult } from "./INominatimResult";
export declare class NominatimApi {
    static searchUrl: string;
    static search(params: INominatimParams, fake?: boolean): Promise<INominatimResult[]>;
}
//# sourceMappingURL=NominatimApi.d.ts.map