import * as React from 'react';
import { Switch } from '../../atoms';
import { SwitchProps, SwitchPropTypes } from '../../molecules/SwitchProps/SwitchProps';
import { SwitchBoxGroup } from '../../molecules/SwitchBoxGroup/SwitchBoxGroup';
import PropTypes from 'prop-types';

export type DebugParamTogglesGroupProps = {
    debugForm: SwitchProps;
    viewPanel: SwitchProps;
    groupLabel: string;
};
export interface IDebugParamTogglesGroupProps {
    debugForm: SwitchProps;
    viewPanel: SwitchProps;
    groupLabel: string;
}

export const DebugParamTogglesGroup: React.FunctionComponent<DebugParamTogglesGroupProps> = (
    props?: Optional<DebugParamTogglesGroupProps>
) => {
    if (!props) {
        return null;
    }
    return (
        <SwitchBoxGroup {...props.groupLabel}>
            <Switch {...props.debugForm} />
            <Switch {...props.viewPanel} />
        </SwitchBoxGroup>
    );
};

// DebugParamTogglesGroup.propTypes = {
//     // debugForm: PropTypes.object,
//     // viewPanel: PropTypes.object,
//     debugForm: PropTypes.shape(SwitchPropTypes),
//     viewPanel: PropTypes.shape(SwitchPropTypes),
//     groupLabel: PropTypes.string,
// };

DebugParamTogglesGroup.defaultProps = {
    debugForm: undefined,
    viewPanel: undefined,
    groupLabel: undefined,
};

// Type '{
//   debugForm: Requireable<InferProps<{ label: Requireable<string>; name: Requireable<string>; checked: Requireable<boolean>; disabled: Requireable<boolean>; isRequired: Requireable<boolean>; palette: Requireable<...>; state: Requireable<...>; onChange: Requireable<...>; }>>;
//   viewPanel: Requireable<...>;
//   groupLabel: R...'
//      is not assignable to type
//   'WeakValidationMap<IDebugParamTogglesGroupProps>'.
//   Types of property 'debugForm' are incompatible.
//     Type 'Requireable<InferProps<{ label: Requireable<string>; name: Requireable<string>; checked: Requireable<boolean>; disabled: Requireable<boolean>; isRequired: Requireable<boolean>; palette: Requireable<string>; state: Requireable<...>; onChange: Requireable<...>; }>>'
// is not assignable to type 'Validator<ISwitchProps>'.
