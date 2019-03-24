import * as React from 'react';
import { styled, Card, Box, Hidden, Divider } from '@geo-ball/component-lib';
import { DebuggerSwitch } from '../DebuggerSwitch';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IHiddenDebuggerSectionProps {
    title: string;
    formMgr: any;
    mainForm: any;
    debugForm: any;
    hidden: any;
    formState: any;
}

export const HiddenDebuggerSection = ({
    title,
    formMgr,
    mainForm,
    debugForm,
    hidden,
}: IHiddenDebuggerSectionProps) => {
    // console.log('HiddenDebuggerSection.mainForm:', mainForm);
    // console.log('HiddenDebuggerSection.debugForm:', debugForm);
    // console.log('HiddenDebuggerSection.rest:', rest);
    const debugProps = {
        formMgr,
    };
    return (
        <SectionCard elevation="400" title={title} headerActions={<DebuggerSwitch {...hidden} />}>
            {mainForm}
            <Hidden {...hidden}>
                <>
                    <Divider marginTop="major-4" />
                    {debugForm(debugProps)}
                </>
            </Hidden>
        </SectionCard>
    );
};
