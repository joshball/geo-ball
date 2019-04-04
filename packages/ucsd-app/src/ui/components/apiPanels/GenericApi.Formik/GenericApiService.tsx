export interface IGenericUrlParams {
    id: string;
    count: string;
}

export class GenericUrlParams implements IGenericUrlParams {
    id: string;
    count: string;
    constructor(id: string = '', count: string = '10') {
        this.id = id;
        this.count = count;
    }
}

export interface IGenericBodyParams {
    query: string;
}

export class GenericBodyParams implements IGenericBodyParams {
    query: string;
    constructor(query: string = '') {
        this.query = query;
    }
}

export interface IGenericHeaders {
    secret: string;
}

export class GenericHeaders implements IGenericHeaders {
    secret: string;
    constructor(secret: string = '') {
        this.secret = secret;
    }
}

export interface IGenericApiResponse {
    date: string;
    urlParams: IGenericUrlParams;
    bodyParams: IGenericBodyParams;
    headers: IGenericHeaders;
}

export class GenericApiService {
    static DEFAULT_TIMEOUT_MS = 3000;

    static FetchWithGet(
        urlParams: IGenericUrlParams,
        bodyParams: IGenericBodyParams,
        headers: IGenericHeaders,
    ): Promise<IGenericApiResponse> {
        console.log('GenericApiService.FetchWithGet()');
        console.log('  FetchWithGet() delay:', GenericApiService.DEFAULT_TIMEOUT_MS);
        console.log('  FetchWithGet() urlParams:', urlParams);
        console.log('  FetchWithGet() bodyParams:', bodyParams);
        console.log('  FetchWithGet() headers:', headers);
        return new Promise(resolve =>
            setTimeout(() => {
                const resp = {
                    date: new Date().toISOString(),
                    urlParams,
                    bodyParams,
                    headers,
                };
                console.log('GenericApiService.FetchWithGet() RESP:', resp);
                resolve(resp);
            }, GenericApiService.DEFAULT_TIMEOUT_MS),
        );
    }
}
