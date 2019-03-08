import * as React from 'react';
import { Switch } from '../../atoms';
import { SwitchBoxGroup } from '../../molecules';

export type ParameterDebugSwitchGroupProps = {
    debugParams: any; // SwitchProps;
    debugForm: any; // SwitchProps;
};

export const ParameterDebugSwitchGroup: React.FunctionComponent<ParameterDebugSwitchGroupProps> = props => {
    if (!props) {
        return null;
    }
    return (
        <SwitchBoxGroup>
            <Switch {...props.debugParams} />
            <Switch {...props.debugForm} />
        </SwitchBoxGroup>
    );
};

// ParameterDebugSwitchGroup.propTypes = {
//     // debugForm: PropTypes.object,
//     // viewPanel: PropTypes.object,
//     debugForm: PropTypes.shape(SwitchPropTypes),
//     viewPanel: PropTypes.shape(SwitchPropTypes),
//     groupLabel: PropTypes.string,
// };

ParameterDebugSwitchGroup.defaultProps = {
    debugParams: undefined,
    debugForm: undefined,
};
