import * as  React from "react";
import { Switch } from "@blueprintjs/core";

import { EventCallback } from "../../../types/EventCallback";

export interface IActionToggle {
    hide?: boolean;
    disabled?: boolean;
    value?: boolean;
    label: string;
    toggle: EventCallback;
}

export class KeyedSwitch extends Switch {
    key?: string | number;
}


export class ActionToggle implements IActionToggle {
    hide: boolean;
    disabled: boolean;
    value: boolean;
    label: string;
    toggle: EventCallback;

    constructor(at: IActionToggle) {
        this.hide = at.hide || false;
        this.disabled = at.disabled || false;
        this.value = at.value || false;
        this.label = at.label;
        this.toggle = at.toggle;
    }

    getSwitch = (switchStyle: any) =>
        <Switch
            style={switchStyle}
            checked={this.value}
            label={this.label}
            onChange={this.toggle}
        />

    getSwitchComponent = (switchStyle: any) => () => this.getSwitch(switchStyle);

    getKeyedSwitch = (key: number, switchStyle: any) =>
        <KeyedSwitch
            key={key}
            style={switchStyle}
            checked={this.value}
            label={this.label}
            onChange={this.toggle}
        />

}

