import * as React from 'react';
import { useContext } from 'react';
import { FormApiContext } from './Context';

function useFormApi(): any {
    const formApi = useContext(FormApiContext);
    return formApi;
}

export default useFormApi;
