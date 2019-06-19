import React from 'react';
import { FormikProps } from 'formik';
import {
    FormikInputField,
    FormikSelectField,
    SelectOption,
} from 'react-data-file-manager';

import {
    IOverpassQueryFile,
    // UnicornColors,
} from '@ui/services/OverpassQueryFilesService';

// const options = UnicornColors.map(color => new SelectOption(color));
const options = ['red', 'green'].map(color => new SelectOption(color));

export const OverpassQueryFileEditForm = (
    props: FormikProps<IOverpassQueryFile>
) => {
    console.log('OverpassQueryFileEditForm props', props);
    return (
        <React.Fragment>
            <FormikInputField
                type="text"
                name="contents.name"
                label="Name"
                {...props}
            />
            <FormikInputField
                type="number"
                name="contents.age"
                label="Age"
                {...props}
            />
            <FormikSelectField
                name="contents.color"
                label="Color"
                options={options}
                {...props}
            />
        </React.Fragment>
    );
};
