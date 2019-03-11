import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Card } from '../../atoms';

export interface ISwitchBoxGroupProps {
    // a11yId?: string;
    /** label */
    groupLabel?: string;
    children?: React.ReactNode;
}

export const SwitchBoxGroup: React.FunctionComponent<ISwitchBoxGroupProps> = ({
    groupLabel,
    children,
    ...rest
}) => {
    return (
        <Card title={groupLabel} {...rest}>
            <h3>{groupLabel}</h3>
            {children}
        </Card>
    );
};

SwitchBoxGroup.propTypes = {
    // a11yId: PropTypes.string,
    groupLabel: PropTypes.string,
    children: PropTypes.node,
};

SwitchBoxGroup.defaultProps = {
    // a11yId: undefined,
    groupLabel: undefined,
    children: undefined,
};
