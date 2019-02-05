import * as React from 'react'
import { css } from 'glamor'
import { H1 } from "@blueprintjs/core";
import { CenteredContent } from '../components/common/layout/CenteredContent';
import { DataDirectorySettingsComponent } from '../components/settings/DataDirectorySettingsComponent';

const mainLayout = css({
    minHeight: 'calc(100vh - 50px)',
});

export const SettingsPage: React.SFC<any> = () => {
    return (
        <CenteredContent style={mainLayout}>
            <H1>Settings</H1>
            <DataDirectorySettingsComponent />
        </CenteredContent>
    )
}

