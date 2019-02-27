import * as React from 'react';
import { Card, Set } from 'fannypack';
import PropTypes from 'prop-types';

export type SwitchBoxGroupProps = {
    a11yId?: string;
    /** label */
    groupLabel?: string;
    children?: React.ReactNode;
};

export const SwitchBoxGroup: React.FunctionComponent<SwitchBoxGroupProps> = ({ groupLabel, children, ...rest }) => {
    return (
        <Card title={groupLabel} {...rest}>
            <Set>{children}</Set>
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
