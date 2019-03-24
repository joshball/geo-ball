import * as React from 'react';

const FormRegisterContext = React.createContext({
    register: (_field: any, _fieldState: any, _options: any) => {},
    deregister: (_field: any) => {},
    setValue: (_field: any, _val: any) => {},
    setTouched: (_field: any, _val: any) => {},
    setError: (_field: any, _val: any) => {},
    update: (_field: any, _options: any) => {},
});

const FormStateContext = React.createContext({});
const FormApiContext = React.createContext({
    getFullField: () => {},
});
const GroupContext = React.createContext({});
const SelectContext = React.createContext({});

export { FormRegisterContext, FormStateContext, FormApiContext, GroupContext, SelectContext };
