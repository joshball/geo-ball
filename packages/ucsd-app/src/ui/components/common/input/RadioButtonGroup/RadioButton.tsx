import * as React from 'react'
import { Button, IButtonProps } from '@blueprintjs/core';
import { RadioButtonGroupConsumer } from './RadioButtonGroup';


// export interface IRadioButton {
//     value: any;
//     // active?: boolean;
// }
// export interface IRadioButtonProps extends IButtonProps, IRadioButton {
//     children: any;
// }
export interface IRadioButtonProps extends IButtonProps {
    id: string;
    children: any;
}

export const RadioButton = (props: IRadioButtonProps) => {
    console.log('')
    console.log('RadioButton. PROPS', props)
    const { id } = props;
    return <RadioButtonGroupConsumer>
        {(ctx) => {
            // console.log('RadioButton.CTX', ctx);
            const onClick = (e: any) => {
                console.log('Button.onClick', id)
                ctx.onButtonClicked(e, id);
            };
            const isActive = ctx.selectedButtonId === id;
            console.log(`Button.ctx.selectedButtonId(${ctx.selectedButtonId}), id(${id}), isActive: ${isActive}`)
            // return <Button onClick={onClick} value={value} active={active} {...props}>
            return <Button onClick={onClick} value={id} active={isActive} {...props}>
                {props.children}
            </Button>;
        }
        }
    </RadioButtonGroupConsumer>
}
// export const RadioButton = (props: IRadioButtonProps) => {
//     const { value, active } = props;
//     return <RadioButtonGroupConsumer>
//         {(ctx) => {
//             const onClick = (e: any) => {
//                 console.log('Button.onClick', value, active)
//                 console.log('Button.onButtonClicked', ctx.onButtonClicked)
//                 ctx.onButtonClicked(e, { value, active });
//             };
//             const isActive = ctx.value === value;
//             console.log('Button.ctx.value', ctx.value, value, isActive)
//             // return <Button onClick={onClick} value={value} active={active} {...props}>
//             return <Button onClick={onClick} value={value} active={isActive} {...props}>
//                 {props.children}
//             </Button>;
//         }
//         }
//     </RadioButtonGroupConsumer>
// }
