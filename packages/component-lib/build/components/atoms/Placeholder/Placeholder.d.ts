import { Component } from 'react';
import PropTypes from 'prop-types';
import './Placeholder.css';
export interface IPlaceholderProps {
    type: string;
    width: number;
    height: number;
}
/**
 * Image placeholders.
 */
export default class Placeholder extends Component<IPlaceholderProps> {
    static propTypes: {
        type: PropTypes.Requireable<string>;
        width: PropTypes.Requireable<number>;
        height: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        type: string;
        width: number;
        height: number;
    };
    getImageUrl(): any;
    render(): JSX.Element;
}
//# sourceMappingURL=Placeholder.d.ts.map