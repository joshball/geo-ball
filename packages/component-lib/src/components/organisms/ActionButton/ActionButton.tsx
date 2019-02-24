import * as React from 'react';
import { Button, Intent } from '@blueprintjs/core';

/**
 * THis si the data interface for ActionButton
 */
export interface IActionButton {
    hide?: boolean;
    disabled?: boolean;
    intent?: Intent;
    label: string;
    execute: () => Promise<any>;
}


export class ActionButton implements IActionButton {
    hide: boolean;
    disabled: boolean;
    intent: Intent;
    label: string;
    execute: () => Promise<any>;

    constructor(actionButton: IActionButton) {
        this.hide = actionButton.hide || false;
        this.disabled = actionButton.disabled || false;
        this.intent = actionButton.intent || Intent.PRIMARY;
        this.label = actionButton.label;
        this.execute = actionButton.execute;
    }

    getButton = (props?: any) =>
        <Button
            {...props}
            disabled={this.disabled}
            onClick={this.execute}
            intent={this.intent}>
            {this.label}
        </Button>

}

