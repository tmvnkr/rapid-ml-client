import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { EventDashboard, NavBar } from '../../features';
import EventDetailedPage from '../../features/event/detailed/detailed-page';
import PeopleDashboard from '../../features/user/dashboard/dashboard';
import UserDetailedPage from '../../features/user/detailed/detailed';
import SettingsDashboard from '../../features/user/settings/dashboard';
import EventForm from '../../features/event/form/form';
import HomePage from '../../features/home/homepage';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>

      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailedPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailedPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}
