import { ActionFormikConfig, ActionFormikProps } from './FormikHelpers';
// import { GenericFormWithDebug } from './GenericFormContainer';
import { GenericFormWithDebug } from '../../components/organisms/DebugFormixDiv';

export const BindAdditionalPropsToForm = <TFormValues>(
    formikConfig: ActionFormikConfig<TFormValues>,
    GenericForm: any,
) => (props: ActionFormikProps<TFormValues>) => {
    const additionalProps = formikConfig.additionalProps || {
        bindSubmitForm: undefined,
        bindValidateForm: undefined,
        bindGetFormValues: undefined,
        showDebugForm: false,
    };
    // props.additionalProps = additionalProps
    // console.log("GenericUrlParamsFormContainer ACTION PROPS:", props)
    // console.log("GenericUrlParamsFormContainer additionalProps:", additionalProps)
    if (additionalProps) {
        if (additionalProps.bindSubmitForm) {
            additionalProps.bindSubmitForm(props.submitForm);
        }
        if (additionalProps.bindValidateForm) {
            additionalProps.bindValidateForm(props.validateForm);
        }
        if (additionalProps.bindGetFormValues) {
            additionalProps.bindGetFormValues(() => props.values);
        }
        // additionalProps.showDebugForm;
    }
    props.additionalProps = additionalProps;
    // const gf = GenericForm({ ...props });
    // console.log('GF', gf);
    // return gf;
    return GenericFormWithDebug(GenericForm({ ...props }), props);
};
