// import * as React from 'react'
// import { css, target } from 'glamor'
// import { Button, ButtonGroup, IButtonProps } from '@blueprintjs/core';

// type OnRadioButtonGroupItemClickedCb = (event: React.MouseEvent<HTMLElement, MouseEvent>, button: IRadioButtonData, ) => void;

// export interface IRadioButtonData {
//     id: string;
//     label: string;
//     active?: boolean;
//     icon?: any;
// }

// export class RadioButtonData implements IRadioButtonData {
//     id: string;
//     label: string;
//     active?: boolean | undefined;
//     icon?: any;

//     constructor(id: string, label: string, active: boolean = false, icon?: any | undefined) {
//         this.id = id;
//         this.label = label;
//         this.active = active;
//         this.icon = icon;
//     }

// }


// export interface IRadioButtonProps extends IButtonProps {
//     // button: IRadioButtonData
//     // key: number|string;
//     label: string;
//     value: any;
//     // onSingleButtonClickedCallback: OnRadioButtonGroupItemClickedCb;
//     // onSingleButtonClickedCallback: (event:any, button:any) => void
// }

// export const RadioButton = (props: IRadioButtonProps) => {
//     const {label, value, icon, active} = props;
//     // const {button} = props;
//     const onClick = (event: React.MouseEvent<HTMLElement>) => {
//         console.log('RadioButton.onCLick event', value, event)
//         // console.log('RadioButton.onCLick button', button.id, button.label, button.active)
//         // event.persist();
//         // props.onSingleButtonClickedCallback(event, button);
//     }
//     // return <Button {...props} onClick={onClick}>{props.button.label}</Button>
//     // console.log(`Rendering Button id:${button.id} active:${button.active}`)
//     // return <Button icon={button.icon} onClick={onClick} active={button.active}>{button.label}</Button>
//     return <Button icon={icon} onClick={onClick} active={active}>{label}</Button>

// }
