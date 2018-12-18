import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

export default function Navbar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          {/* <img src="assets/logo.png" alt="logo" /> */}
          <h1>
            <i>
              <u>>R</u>APID<u>>M</u>L
            </i>
          </h1>
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button floated="right" color="orange" content="Create Event" />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button
            basic
            inverted
            content="Sign Out"
            style={{ marginLeft: '0.5em' }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
