// This is the top-most component in the app.
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { NavBarMenuComponent, MainLayout, BodyLayout } from '@ui/components';
import { OverpassDataFileManagerPage, SettingsPage } from '@ui/pages';

import { DebugRouter } from './DebugRouter';

export const RootComponent: React.FC = () => {
    return (
        <DebugRouter>
            <BodyLayout>
                <NavBarMenuComponent />
                <MainLayout>
                    <Switch>
                        <Route
                            path="/"
                            component={OverpassDataFileManagerPage}
                            exact
                        />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </MainLayout>
            </BodyLayout>
        </DebugRouter>
    );
};
