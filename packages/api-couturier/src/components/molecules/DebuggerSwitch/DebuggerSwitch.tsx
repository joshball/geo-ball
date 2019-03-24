import * as React from 'react';
import { Switch } from '@geo-ball/component-lib';
export interface IDebuggerSwitch {
    isVisible: boolean;
    toggle: () => void;
}

export const DebuggerSwitch = ({ isVisible, toggle, ...rest }: IDebuggerSwitch) => (
    <Switch label="Show Debugger" checked={isVisible} onChange={toggle} {...rest} />
);
