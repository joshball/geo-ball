import * as React from 'react';
import { styled, Card, Box, Hidden, Divider } from '@geo-ball/component-lib';
import { DebuggerSwitch } from '../DebuggerSwitch';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IHiddenDebuggerSectionProps {
    title: string;
    MainForm: any;
    DebugForm: any;
    hidden: any;
}

export const HiddenDebuggerSection = ({
    title,
    MainForm,
    DebugForm,
    hidden,
    ...rest
}: IHiddenDebuggerSectionProps) => {
    // console.log('HiddenDebuggerSection.MainForm:', MainForm);
    // console.log('HiddenDebuggerSection.DebugForm:', DebugForm);
    console.log('****** HiddenDebuggerSection.rest:', rest);
    return (
        <SectionCard elevation="400" title={title} headerActions={<DebuggerSwitch {...hidden} />}>
            <MainForm {...rest} />

            <Hidden {...hidden}>
                <>
                    <Divider marginTop="major-4" />
                    {/* {debugForm(debugProps)} */}
                    <DebugForm {...rest} />
                </>
            </Hidden>
        </SectionCard>
    );
};
