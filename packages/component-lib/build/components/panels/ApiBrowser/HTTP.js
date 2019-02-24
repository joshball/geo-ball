"use strict";
// import { IApiDescription } from './ApiBrowser';
// export const callApi = (api: IApiDescription): Promise<any> => {
//     if (api.method === 'get') {
//         return callGetApi(api)
//     }
//     throw new Error(`Unsupported API method ${api.method}`)
// }
// export const callGetApi = (api: IApiDescription): Promise<any> => {
//     const { url, apiParams } = api;
//     const fullUrl = `${url}?${apiParams.getParams()}`
//     return fetch(fullUrl).then(resp => resp.json());
// }
// export const callPostApi = (api: IApiDescription): Promise<any> => {
//     const { url, apiParams } = api;
//     const fullUrl = `${url}?${apiParams.getParams()}`
//     const postOptions = {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, cors, *same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//             "Content-Type": "application/json",
//             // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         redirect: "follow", // manual, *follow, error
//         referrer: "no-referrer", // no-referrer, *client
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//     };
//     return fetch(fullUrl).then(resp => resp.json());
// }
//# sourceMappingURL=HTTP.js.map