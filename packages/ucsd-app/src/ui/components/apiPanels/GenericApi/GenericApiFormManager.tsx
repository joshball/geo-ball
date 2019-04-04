import { ApiFormValuesTuple, ApiFormManager } from '@geo-ball/api-couturier';

import {
    GenericUrlParamsFormValues,
    GenericUrlParamsForm,
    GenericBodyParamsFormValues,
    GenericBodyParamsForm,
    GenericHeadersFormValues,
    GenericHeadersForm,
    IGenericUrlParamsFormValues,
    IGenericBodyParamsFormValues,
    IGenericHeadersFormValues,
} from './Forms';

export const CreateApiFormManager = () => {
    const urlTuple = new ApiFormValuesTuple<IGenericUrlParamsFormValues>(
        new GenericUrlParamsFormValues(),
        (GenericUrlParamsForm as never) as JSX.Element,
    );
    const bodyTuple = new ApiFormValuesTuple<IGenericBodyParamsFormValues>(
        new GenericBodyParamsFormValues(),
        (GenericBodyParamsForm as never) as JSX.Element,
    );
    const headersTuple = new ApiFormValuesTuple<IGenericHeadersFormValues>(
        new GenericHeadersFormValues(),
        (GenericHeadersForm as never) as JSX.Element,
    );

    return new ApiFormManager<
        IGenericUrlParamsFormValues,
        IGenericBodyParamsFormValues,
        IGenericHeadersFormValues
    >({ urlTuple, bodyTuple, headersTuple });
};
