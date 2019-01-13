import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BasicsPage from './basic';
import SettingsNav from './nav';
import AboutPage from './about';
import PhotosPage from './photos';
import AccountPage from './account';
import { updatePassword } from '../../auth/actions';

const actions = {
  updatePassword
};

const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId
});

function SettingsDashboard({ updatePassword, providerId }) {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basics" />
          <Route path="/settings/basics" component={BasicsPage} />
          <Route path="/settings/about" component={AboutPage} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(SettingsDashboard);
