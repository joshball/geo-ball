/// <reference types="react" />
import { IActionButton } from '../ActionButton/ActionButton';
import { IActionBarDebugTogglesProps } from './DebugToggles';
/** These are the props for the action bar */
export interface IActionBarProps {
    /**
     * This is the debug toggles description
     */
    debugToggles: IActionBarDebugTogglesProps;
    /** This is the request button description */
    requestButton: IActionButton;
}
/**
 * This bar holds all the actions
 * @param props IActionBarProps
 */
export declare const ActionBar: (props: IActionBarProps) => JSX.Element;
//# sourceMappingURL=ActionBar.d.ts.map