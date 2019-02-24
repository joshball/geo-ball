/// <reference types="react" />
import { Intent } from '@blueprintjs/core';
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
export declare class ActionButton implements IActionButton {
    hide: boolean;
    disabled: boolean;
    intent: Intent;
    label: string;
    execute: () => Promise<any>;
    constructor(actionButton: IActionButton);
    getButton: (props?: any) => JSX.Element;
}
//# sourceMappingURL=ActionButton.d.ts.map