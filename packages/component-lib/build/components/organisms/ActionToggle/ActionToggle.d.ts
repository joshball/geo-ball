/// <reference types="react" />
import { Switch } from "@blueprintjs/core";
import { EventCallback } from "../../../types/EventCallback";
export interface IActionToggle {
    hide?: boolean;
    disabled?: boolean;
    value?: boolean;
    label: string;
    toggle: EventCallback;
}
export declare class KeyedSwitch extends Switch {
    key?: string | number;
}
export declare class ActionToggle implements IActionToggle {
    hide: boolean;
    disabled: boolean;
    value: boolean;
    label: string;
    toggle: EventCallback;
    constructor(at: IActionToggle);
    getSwitch: (switchStyle: any) => JSX.Element;
    getSwitchComponent: (switchStyle: any) => () => JSX.Element;
    getKeyedSwitch: (key: number, switchStyle: any) => JSX.Element;
}
//# sourceMappingURL=ActionToggle.d.ts.map