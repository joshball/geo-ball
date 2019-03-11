import * as React from 'react';
import { createContext } from 'react';
import { Group } from '../../layout';

type clickedButtonCallback = (event: any, clickedButtonId: string) => void;

export const RadioButtonGroupContext = createContext<IRadioButtonGroupState>({
    selectedButtonId: '',
    onButtonClicked: () => {
        console.log();
    },
});

export const RadioButtonGroupConsumer = RadioButtonGroupContext.Consumer;

export interface IRadioButtonGroupProps {
    disabled?: boolean;
    name?: string;
    selectedButtonId?: any;
    onChange?: clickedButtonCallback;
}

export interface IRadioButtonGroupState {
    selectedButtonId: string;
    onButtonClicked: clickedButtonCallback;
}
export class RadioButtonGroup extends React.Component<
    IRadioButtonGroupProps,
    IRadioButtonGroupState
> {
    state: IRadioButtonGroupState;

    constructor(props: IRadioButtonGroupProps) {
        super(props);
        // console.log('RadioButtonGroup() this', this);
        // console.log('RadioButtonGroup() this.props', this.props);
        // console.log('RadioButtonGroup() props.name', props.name);
        // console.log('RadioButtonGroup() props.selectedButtonId', props.selectedButtonId);
        // console.log('RadioButtonGroup() props.onChange', props.onChange);
        if ((props as any).field) {
            // const newProps = props as FormikProps<>)
            const newProps = props as any;
            // console.log('GOT PROPS.....FIELD!', newProps);
            // console.log('GOT PROPS.....FIELD!', newProps.field);
        }
        this.state = {
            selectedButtonId: props.selectedButtonId,
            onButtonClicked: this.onButtonClicked.bind(this),
        };
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }
    get type(): string {
        return 'RadioButtonGroup';
    }

    get value(): string {
        return this.state.selectedButtonId;
    }

    onButtonClicked(event: any, clickedButtonId: string) {
        console.log('RadioButtonGroup.onButtonClicked clickedButtonId', clickedButtonId);
        this.setState({
            selectedButtonId: clickedButtonId,
        });
        if (this.props.onChange) {
            event.target.value = clickedButtonId;
            event.target.name = this.props.name;
            this.props.onChange(event, clickedButtonId);
        }
    }

    render() {
        const { children } = this.props;
        return (
            <Group>
                <RadioButtonGroupContext.Provider value={this.state}>
                    {children}
                </RadioButtonGroupContext.Provider>
            </Group>
        );
    }
}
