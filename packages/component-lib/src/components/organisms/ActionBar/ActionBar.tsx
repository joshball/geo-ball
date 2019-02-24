import * as React from 'react'
// import { Card, Elevation } from '@blueprintjs/core';
import { Card } from 'fannypack';
import { IActionButton, ActionButton } from '../ActionButton/ActionButton';
import { DebugToggles, IActionBarDebugTogglesProps } from './DebugToggles';


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
export const ActionBar = (props: IActionBarProps) => {
    const actionBarDivStyle = {
        overflow: 'hidden',
        height: '30px',
        // float: 'right',
        // display: 'flex',
    }

    console.log('ActionBar PROPS:', props);
    const actionButton = new ActionButton(props.requestButton);
    const ButtonProps = actionButton.getButton();


    return (
        <Card >
            <div style={actionBarDivStyle}>
                {/* <SubmitRequestButton {...props} /> */}
                <DebugToggles {...props.debugToggles} />
                {ButtonProps}
            </div>
        </Card>
    );
}



// export interface ISubmitRequestButtonState {
//     submitting: boolean;
// }

// export class SubmitRequestButton extends React.Component<IActionBarProps, ISubmitRequestButtonState> {

//     state: ISubmitRequestButtonState;

//     constructor(props: IActionBarProps) {
//         super(props)
//         this.state = { submitting: false }
//         this.onClick = this.onClick.bind(this);
//     }

//     async onClick() {
//         console.log('onClick!')
//         this.setState({ submitting: true, });

//         try { await this.props.makeRequest(); }
//         finally {
//             this.setState({ submitting: false, });
//         }
//     }

//     render() {
//         /** @type {{search: React.CSSProperties}} */
//         const buttonDiv = {
//             float: 'right' as FloatProperty,
//             display: 'inline-flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100%',
//             marginRight: '75px',
//             marginLeft: '75px',
//         }

//         return (
//             <div style={buttonDiv}>
//                 <Button
//                     disabled={this.state.submitting}
//                     onClick={this.onClick}
//                     intent={Intent.PRIMARY}
//                 >
//                     Make the request
//                 </Button>
//             </div>
//         );
//     }
// }
