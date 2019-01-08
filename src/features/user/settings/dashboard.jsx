import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingsNav from './nav';
import { Switch, Route, Redirect } from 'react-router-dom';
import BasicsPage from './basic';
import AboutPage from './about';
import PhotosPage from './photos';
import AccountPage from './account';

function SettingsDashboard() {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basics" />
          <Route path="/settings/basics" component={BasicsPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route path="/settings/account" component={AccountPage} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
}

export default SettingsDashboard;
