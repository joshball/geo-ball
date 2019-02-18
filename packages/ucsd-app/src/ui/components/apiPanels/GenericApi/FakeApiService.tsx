export interface IFakeGetApiParams {
    query: string;
    skip: number;
    take: number;
    debug: boolean;
}

export interface IFakeGetApiResult {
    answer: string;
    start: number;
    end: number;
}

export interface IFakeApiService {
    fetchWithGet: (params: any) => any;
}
export class FakeApiService {

    static FetchWithGet(params: IFakeGetApiParams): Promise<IFakeGetApiResult> {
        return new Promise(resolve =>
            setTimeout(() => {
                const result: IFakeGetApiResult = {
                    answer: params.query.toUpperCase(),
                    start: params.skip * params.take,
                    end: params.skip * params.take + params.take - 1,
                }
                resolve(result)
            }, 5000),
        )
    }

}
