import React from 'react';
import { H1 } from '@blueprintjs/core';
import { CenteredContent } from '@ui/components/common/layout/CenteredContent';
import { AppSettingsComponent } from '@ui/components/settings/AppSettingsComponent';

const mainLayout = {
    minHeight: 'calc(100vh - 50px)',
};
// const mainLayout = css({
//     minHeight: 'calc(100vh - 50px)',
// });

export const SettingsPage: React.SFC<any> = () => {
    return (
        <CenteredContent style={mainLayout}>
            <H1>Settings</H1>
            <AppSettingsComponent />
        </CenteredContent>
    );
};
