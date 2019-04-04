export const flattenParams = (params: any): any => {
    const queryParamObj: any = {};

    if (params.query.useStructured) {
        Object.keys(params.query.structuredQuery).forEach(key => {
            const val: any = params.toggles[key];
            if (val) {
                queryParamObj[key] = val;
            }
        });
    } else {
        queryParamObj.q = params.query.stringQuery;
    }

    Object.keys(params.settings).forEach(key => {
        const val: any = params.settings[key];
        if (val) {
            if (key === 'polygon') {
                throw new Error('(deprecated, use one of the polygon_* parameters instead)');
            }
            if (key === 'accept_language') {
                queryParamObj['accept-language'] = val;
            } else {
                queryParamObj[key] = val;
            }
        }
    });

    Object.keys(params.toggles).forEach(key => {
        const val: any = params.toggles[key];
        if (val) {
            queryParamObj[key] = 1;
        }
    });

    return queryParamObj;
};

export interface IQueryParameterObject {
    [name: string]: string | number | boolean;
}

export const validValue = (value: any): boolean => {
    // console.log(`validValue typeof: [${typeof value}] value:[${value}]`);
    if (value === undefined || value === null) {
        return false;
    }
    if (typeof value === 'string') {
        if (value.trim() === '') {
            return false;
        }
    }
    // if(typeof value === 'number'){
    if (value === 0) {
        return true;
    }
    return true;
};
export const getRawQueryParameterString = (qpObj: IQueryParameterObject): string =>
    Object.entries(qpObj)
        .filter(([_key, value]) => validValue(value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

/**
 * encodes characters such as ?,=,/,&,:
 * @param qpObj
 */

export const getEncodedQueryParameterString = (qpObj: IQueryParameterObject): string =>
    Object.entries(qpObj)
        .filter(([_key, value]) => validValue(value))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
        .join('&');
