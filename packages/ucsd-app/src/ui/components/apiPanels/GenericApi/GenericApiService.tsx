export interface IGenericGetUrlParams {
    id: string;
    count: string;
}
export type IGenericGetBodyParams = undefined;

export const GetDefaultUrlParams = (): IGenericGetUrlParams => ({
    id: '',
    count: '10',
});

export interface IGenericGetApiResponse {
    date: string;
    apiParams: IGenericGetUrlParams;
}

export class GenericApiService {
    static DEFAULT_TIMEOUT_MS = 3000;

    static FetchWithGet(apiParams: IGenericGetUrlParams): Promise<IGenericGetApiResponse> {
        console.log(
            '**** GenericApiService.FetchWithGet() delay:',
            GenericApiService.DEFAULT_TIMEOUT_MS,
            apiParams,
        );
        return new Promise(resolve =>
            setTimeout(() => {
                const resp = {
                    date: new Date().toISOString(),
                    apiParams,
                };
                console.log('GenericApiService.FetchWithGet() RESP:', resp);
                resolve(resp);
            }, GenericApiService.DEFAULT_TIMEOUT_MS),
        );
    }
}
