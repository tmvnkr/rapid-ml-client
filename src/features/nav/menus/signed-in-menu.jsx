import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function SignedInMenu({ signOut, profile, auth }) {
  return (
    <Menu.Item position="right">
      <Image
        rounded
        size="mini"
        spaced="right"
        src={profile.photoURL || '/assets/user.png'}
      />
      <Dropdown
        pointing="top left"
        text={profile.displayName}
        openOnFocus
        style={{ zIndex: '900' }}>
        <Dropdown.Menu style={{ left: '-40px', zIndex: '900' }}>
          >
          <Dropdown.Item
            as={Link}
            to={`/createCollection`}
            text="Create Collection"
            icon="plus"
          />
          <Dropdown.Item
            as={Link}
            to={`/settings/photos`}
            text="My Images"
            icon="image"
          />
          <Dropdown.Item
            as={Link}
            to={`/people`}
            text="My Network"
            icon="users"
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            text="My Profile"
            icon="user"
          />
          <Dropdown.Item
            as={Link}
            to="/settings"
            text="Settings"
            icon="settings"
          />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignedInMenu;
