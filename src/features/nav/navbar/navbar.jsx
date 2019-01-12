import React from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../menus/signed-out-menu';
import SignedInMenu from '../menus/signed-in-menu';
import { openModal } from '../../modals/actions';
import { logout } from '../../auth/actions';

const actions = {
  openModal,
  logout
};

const mapState = state => ({
  auth: state.auth
});

function Navbar(props) {
  const handleSignIn = () => {
    props.openModal('LoginModal');
  };

  const handleRegister = () => {
    props.openModal('RegisterModal');
  };

  const handleSignOut = () => {
    props.logout();
    props.history.push('/');
  };

  const authenticated = props.auth.authenticated;

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
        <Menu.Item as={NavLink} to="/collections" name="Collections" />
        <Menu.Item as={NavLink} to="/test" name="Test" />
        {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
        {authenticated && (
          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              color="orange"
              content="Create Collection"
            />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu
            currentUser={props.auth.currentUser}
            signOut={handleSignOut}
          />
        ) : (
          <SignedOutMenu signIn={handleSignIn} register={handleRegister} />
        )}
      </Container>
    </Menu>
  );
}
export default withRouter(
  connect(
    mapState,
    actions
  )(Navbar)
);
