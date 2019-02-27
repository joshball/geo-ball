import * as React from 'react';
import { ReakCard as Card } from '../../atoms';
import PropTypes from 'prop-types';

export type SwitchBoxGroupProps = {
    a11yId?: string;
    /** label */
    groupLabel?: string;
    children?: React.ReactNode;
};

export const SwitchBoxGroup: React.FunctionComponent<SwitchBoxGroupProps> = ({ groupLabel, children, ...rest }) => {
    return (
        // <Card title={groupLabel} {...rest}>
        <Card {...rest}>
            <h3>{groupLabel}</h3>
            {children}
        </Card>
    );
};

SwitchBoxGroup.propTypes = {
    a11yId: PropTypes.string,
    groupLabel: PropTypes.string,
    children: PropTypes.node,
};

SwitchBoxGroup.defaultProps = {
    a11yId: undefined,
    groupLabel: undefined,
    children: undefined,
};
