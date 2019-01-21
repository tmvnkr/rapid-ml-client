import React from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../menus/signed-out-menu';
import SignedInMenu from '../menus/signed-in-menu';
import { openModal } from '../../modals/actions';

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

function Navbar(props) {
  const handleSignIn = () => {
    props.openModal('LoginModal');
  };

  const handleRegister = () => {
    props.openModal('RegisterModal');
  };

  const handleSignOut = () => {
    props.firebase.logout();
    props.history.push('/');
  };

  const authenticated = props.auth.isLoaded && !props.auth.isEmpty;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          <h1>
            <i>
              <u>>R</u>APID<u>>M</u>L🚀
            </i>
          </h1>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/collections" name="Collections" />
        {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
        {authenticated && (
          <Menu.Item>
            <Button
              as={Link}
              to="/createCollection"
              floated="right"
              color="orange"
              content="Create Collection"
              icon="images outline"
              labelPosition="left"
            />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu
            auth={props.auth}
            profile={props.profile}
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
  withFirebase(
    connect(
      mapState,
      actions
    )(Navbar)
  )
);
