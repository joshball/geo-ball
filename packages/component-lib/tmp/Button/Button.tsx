import React from 'react';
import PropTypes, { string } from 'prop-types';

import './Button.css';

export type ButtonSizes = 'small' | 'normal' | 'large';

export interface IButtonSizes {
    [key: string]: string;
}


export interface IButtonProps {
    color: string;
    /** The size of the button */
    // size: PropTypes.oneOf(['small', 'normal', 'large']),
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
export function Button({ color, size, onClick, disabled, children }: IButtonProps) {
    const styles = {
        color,
        fontSize: Button.sizes[size],
    };

    return (
        <button className="button" style={styles} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
Button.propTypes = {
    /** Button label */
    children: PropTypes.node.isRequired,
    /** The color for the button */
    color: PropTypes.string,
    /** The size of the button */
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    /** Disable button */
    disabled: PropTypes.bool,
    /** Gets called when the user clicks on the button */
    onClick: PropTypes.func,
};
Button.defaultProps = {
    color: '#333',
    size: 'normal',
    onClick: (event: any) => {
        // eslint-disable-next-line no-console
        console.log('You have clicked me!', event.target);
    },
};
const buttonSizes: any = {
    small: '10px',
    normal: '14px',
    large: '18px',
};

Button.sizes = buttonSizes;
