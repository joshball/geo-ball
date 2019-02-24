/// <reference types="react" />
import { IActionToggle } from '../ActionToggle/ActionToggle';
export interface IDebugParamTogglesGroupProps {
    debugForm: IActionToggle;
    viewPanel: IActionToggle;
    groupLabel: string;
}
export interface IActionBarDebugTogglesProps {
    /** Thi is the fakeapi callback thingy */
    fakeApiCall: IActionToggle;
    queryParams?: IDebugParamTogglesGroupProps;
    bodyParams?: IDebugParamTogglesGroupProps;
}
export declare const ParamToggleGroup: (props?: IDebugParamTogglesGroupProps | undefined) => JSX.Element | null;
export declare const DebugToggles: (props: IActionBarDebugTogglesProps) => JSX.Element;
//# sourceMappingURL=DebugToggles.d.ts.map