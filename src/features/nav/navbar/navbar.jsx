import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../menus/signed-out-menu';
import SignedInMenu from '../menus/signed-in-menu';

function Navbar({ history }) {
  const [auth, setAuth] = useState(false);

  const handleSignIn = () => {
    setAuth(true);
  };

  const handleSignOut = () => {
    setAuth(false);
    history.push('/');
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          <h1>
            <i>
              <u>>R</u>APID<u>>M</u>L
            </i>
          </h1>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events" />
        <Menu.Item as={NavLink} to="/test" name="Test" />
        {auth && <Menu.Item as={NavLink} to="/people" name="People" />}
        {auth && (
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              color="orange"
              content="Create Event"
            />
          </Menu.Item>
        )}
        {auth ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu signIn={handleSignIn} />
        )}
      </Container>
    </Menu>
  );
}
export default withRouter(Navbar);
