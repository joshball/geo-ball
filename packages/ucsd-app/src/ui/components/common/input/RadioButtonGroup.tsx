import * as React from 'react'
import { createContext } from 'react'
import { css, target } from 'glamor'
// import { IRadioButtonGroupItem, RadioButtonGroupItem, IRadioButtonGroupComponentProps, RadioButtonGroupComponent } from './RadioButtonGroupComponent';
import { ButtonGroup, IButtonGroupProps } from '@blueprintjs/core';
import { IRadioButtonData, RadioButton, RadioButtonData, IRadioButtonProps } from './RadioButton';




// export interface IButtonInfo {
//     id: string;
//     name: string;
//     active?: boolean;
// }

export const RadioButtonGroupContext = createContext({});


export type RadioButtonGroupOnChangeCallback = (button: IRadioButtonData, event: React.FormEvent<HTMLDivElement>) => void;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
interface IButtonGroupNoChangeProps extends Omit<IButtonGroupProps, 'onChange'> { }

export interface RadioButtonGroupProps extends IButtonGroupNoChangeProps {
    buttons?: Array<IRadioButtonData>
    disabled?: boolean;
    label?: string;
    name?: string;
    formFieldName?: string;
    value?: any;
    children?: any;

    /**
     * Callback invoked when the currently selected radio changes.
     * Use `event.currentTarget.value` to read the currently selected value.
     * This prop is required because this component only supports controlled usage.
     */
    onChange?: RadioButtonGroupOnChangeCallback
    onFormixChange?: (field: string, value: any, shouldValidate?: boolean) => void
}

export interface RadioButtonGroupState {
    // buttons: Array<RadioButtonData>
    value?: string | string[] | number;
}
// handleRadioGroupChange(event: React.FormEvent<HTMLInputElement>): void {
//     event.preventDefault();
//     console.log('handleRadioGroupChange.item', event.target);
// }
export class RadioButtonGroup extends React.Component<RadioButtonGroupProps, RadioButtonGroupState> {

    state: RadioButtonGroupState;

    constructor(props: RadioButtonGroupProps) {
        super(props);
        // const active = props.buttons.find(button => button.active === true) || props.buttons[0];
        this.state = {
            // buttons: props.buttons.map((b) => new RadioButtonData(b.id, b.label, b.active)),
            // value: active.id
            // value: props.value ? props.value : props.defaultValue
        }
        this.onContainerButtonClicked = this.onContainerButtonClicked.bind(this);
    }

    get value() {
        return this.state.value;
    }

    onChange(button: IRadioButtonData, event: React.FormEvent<HTMLInputElement>) {
        if (this.props.onChange) {
            this.props.onChange(button, event);
        }
        // Formix is going to pass setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
        // into our onChange props
        // Set the value of a field imperatively.
        // field should match the key of values you wish to update.
        // Useful for creating custom input change handlers.
        // Calling this will trigger validation to run if validateOnChange is set to true (which it is by default).
        // You can also explicitly prevent/skip validation by passing a third argument as false.
        if (this.props.onFormixChange) {
            if (!this.props.formFieldName) {
                throw new Error('Must set the formFieldName')
            }
            this.props.onFormixChange(this.props.formFieldName, button.id);
        }
    }

    onContainerButtonClicked = (event: React.MouseEvent<HTMLElement>, theClickedButton: IRadioButtonData) => {
        // onContainerButtonClicked = (event: any, theClickedButton: any) => {
        console.log('onContainerButtonClicked buttton.id', theClickedButton.id);
        console.log('onContainerButtonClicked state.value', this.state.value);

        const buttonIdStr = (bd: IRadioButtonData): string => `[id: ${bd.id} active:${bd.active}]`;
        const adjustButtonState = (currentButtonState: IRadioButtonData, clickedButton: IRadioButtonData) => {
            console.log(`abs (currButt ${buttonIdStr(currentButtonState)}) (clickedButt ${buttonIdStr(clickedButton)}) `);
            if (clickedButton.id === currentButtonState.id) {
                // THIS button is now selected

                if (!currentButtonState.active) { // if this button is currently NOT selected/active
                    console.log(`abs making (currButt ${buttonIdStr(currentButtonState)}) active and firing onCHange`);
                    // make it active
                    currentButtonState.active = true;
                    // and fire onChange
                    this.onChange(currentButtonState, (event as unknown as React.FormEvent<HTMLInputElement>))
                }
                else {
                    // this button is currently active, so we need to do nothing
                }
            }
            else {
                // This button was NOT clicked. Therefore a different button was, and will be marked active
                // so lets make sure this button is NOT active.
                currentButtonState.active = false;
            }
        }
        // this.setState(prevState => {
        //     console.log('BG.SETTTTING STATE BEFORE prevState:', prevState)
        //     prevState.buttons.forEach((prevStateButton) => adjustButtonState(prevStateButton, theClickedButton));
        //     const newActiveButton = prevState.buttons.find((b) => b.active === true) || prevState.buttons[0];
        //     console.log('BG.SETTTTING STATE AFTER prevState:', prevState);
        //     return { ...prevState, value: newActiveButton.id };
        // })
    }

    render() {
        // const props: IRadioButtonProps = {
        //     buttons: this.state.buttons,
        //     onButtonClicked: this.onButtonClicked
        // };
        // const radioButtons = this.state.buttons.map(bd => {
        //     const x: IRadioButtonProps = {
        //         button: bd,
        //         key: bd.id,
        //         onSingleButtonClickedCallback: this.onContainerButtonClicked
        //     };
        //     return <RadioButton key={bd.id} button={bd} onSingleButtonClickedCallback={this.onContainerButtonClicked} />;
        // })
        console.log('BG.render() state.value', this.state.value);
        return (
            <ButtonGroup>
                {/* {radioButtons} */}
                {this.props.children}
            </ButtonGroup>
        );

    }
}

