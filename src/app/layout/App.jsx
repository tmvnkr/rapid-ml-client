import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import { EventDashboard, NavBar } from '../../features'
import { GlobalStyle } from '../../theme'
import EventDetailedPage from '../../features/event/detailed/detailed'
import PeopleDashboard from '../../features/user/dashboard/dashboard'
import UserDetailedPage from '../../features/user/detailed/detailed'
import SettingsDashboard from '../../features/user/settings/dashboard'
import EventForm from '../../features/event/form/form'
import ImageUpload from '../../features/event/image-upload/image-upload'
import HomePage from '../../features/home/homepage'
import ModalManager from '../../features/modals/manager'
import NotFound from '../../app/layout/not-found'
import { UserIsAuthenticated } from '../../features/auth/auth-wrapper'

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
                <Route path="/collection/:id" component={UserIsAuthenticated(EventDetailedPage)} />
                <Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
                <Route path="/imageUpload/:id" component={UserIsAuthenticated(ImageUpload)} />
                <Route path="/people" component={UserIsAuthenticated(PeopleDashboard)} />
                <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)} />
                <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
                <Route path="/createCollection" component={UserIsAuthenticated(EventForm)} />
                <Route path="/error" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  )
}
