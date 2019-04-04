export type FormFieldValue<T = string> = T;

export type FormError = string;

export interface IFormValues {
    [key: string]: FormFieldValue;
}

export interface IErrorValues {
    [key: string]: FormError;
}

export interface IBooleanValues {
    [key: string]: boolean;
}

export interface IBaseFieldProps<TFieldType>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
    initialValue?: Optional<TFieldType>;
    validate?: Optional<(value: TFieldType, values: IFormValues) => FormError>;
    validateOnBlur?: Optional<boolean>;
    validateOnChange?: Optional<boolean>;
    validateOnMount?: Optional<boolean>;
    notify?: Optional<Array<keyof IFormValues>>;
    mask?: Optional<(value: TFieldType) => TFieldType>;
    maskOnBlur?: Optional<boolean>;
    format?: Optional<(value: TFieldType) => TFieldType>;
    parse?: Optional<(value: TFieldType) => TFieldType>;
    onValueChange?: Optional<(value: TFieldType) => void>;
    value?: Optional<TFieldType>;
    forwardedRef?: Optional<React.RefObject<HTMLInputElement>>;
}

// export interface IOtherFieldProps {
//     debug?: Optional<boolean>;
//     field?: Optional<string>;
//     type?: Optional<string>;
//     forwardedRef?: Optional<React.RefObject<HTMLInputElement>>;
// }

export interface IFieldApi {
    getValue: () => FormFieldValue;
    setValue: (value: FormFieldValue) => void;

    getTouched: () => boolean;
    setTouched: (touched: boolean) => void;

    getError: () => FormError;
    setError: (error: FormError) => void;

    reset: () => void;
    validate: () => void;
}

export interface IFieldState {
    value: FormFieldValue;
    maskedValue: FormFieldValue;
    touched: boolean;
    error?: Optional<FormError>;
}

export interface IFieldProps<TFieldType> extends IBaseFieldProps<TFieldType> {
    keepState?: Optional<boolean>;
    maintainCursor?: Optional<boolean>;
    debug?: Optional<boolean>;
    type?: Optional<string>;
    field?: Optional<string>;
    forwardedRef?: Optional<React.RefObject<HTMLInputElement>>;
}

export interface IAsFieldContext<TFieldType> extends IFieldProps<TFieldType> {
    fieldState: IFieldState;
    fieldApi: IFieldApi;
    // props: IOtherFieldProps;
    // props: IFieldProps<TFieldType>;
    // props: React.InputHTMLAttributes<HTMLInputElement>;
    // not sure what this is for, I actually found it in https://github.com/joepuzzo/informed/blob/02584aeb10bbf04875bddc974f62db95c5612f57/src/hooks/useField.js#L205, not in the docs
    // purify: <T>(children: T, userProps?: any[]) => T;
    // ref: React.RefObject<any>;
}

// const x:React.InputHTMLAttributes<HTMLInputElement> = {};
// x.onChange

export interface IFormState {
    values: IFormValues;
    touched: IBooleanValues;
    errors: IErrorValues;
    asyncErrors: IErrorValues;
    error?: Optional<string>;
    invalid: boolean;
    pristine: boolean;
    dirty: boolean;
    submits: number;
}

export interface IFormApi {
    setValue: (field: string, value: FormFieldValue) => void;
    getValue: (field: string) => FormFieldValue;

    setTouched: (field: string, touched: boolean) => void;
    getTouched: (field: string) => boolean;

    setError: (field: string, error: FormError) => void;
    getError: (field: string) => FormError;

    getValues: () => IFormValues;
    setValues: (values: IFormValues) => void;

    getInitialValue: (field: string) => FormFieldValue;
    getState: () => IFormState;

    fieldExists: (field: string) => boolean;
    getFullField: (field: string) => string;

    reset: () => void;
    submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
}
