/// <reference types="react" />
import PropTypes from 'prop-types';
import './Button.css';
export declare type ButtonSizes = 'small' | 'normal' | 'large';
export interface IButtonSizes {
    [key: string]: string;
}
export interface IButtonProps {
    color: string;
    /** The size of the button */
    size: string;
    /** Disable button */
    disabled: boolean;
    /** Gets called when the user clicks on the button */
    onClick: () => void;
    children: any;
}
/**
 * The only true button.
 */
export declare function Button({ color, size, onClick, disabled, children }: IButtonProps): JSX.Element;
export declare namespace Button {
    var propTypes: {
        /** Button label */
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /** The color for the button */
        color: PropTypes.Requireable<string>;
        /** The size of the button */
        size: PropTypes.Requireable<string>;
        /** Disable button */
        disabled: PropTypes.Requireable<boolean>;
        /** Gets called when the user clicks on the button */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        color: string;
        size: string;
        onClick: (event: any) => void;
    };
    var sizes: any;
}
//# sourceMappingURL=Button.d.ts.map