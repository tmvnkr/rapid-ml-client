import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { EventDashboard, NavBar } from '../../features';
import { GlobalStyle } from '../../theme';
import EventDetailedPage from '../../features/event/detailed/detailed';
import PeopleDashboard from '../../features/user/dashboard/dashboard';
import UserDetailedPage from '../../features/user/detailed/detailed';
import SettingsDashboard from '../../features/user/settings/dashboard';
import EventFormCreate from '../../features/event/form/form-create';
import EventFormManage from '../../features/event/form/form-manage';
import HomePage from '../../features/home/homepage';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/manager';

export default function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <ModalManager />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>

      <Route
        path="/(.+)"
        render={() => (
          <Fragment>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path="/collections" component={EventDashboard} />
                <Route path="/test" component={TestComponent} />
                <Route path="/collection/:id" component={EventDetailedPage} />
                <Route path="/manage/:id" component={EventFormManage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailedPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventFormCreate} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}
