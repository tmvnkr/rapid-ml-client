import React from 'react';
import { Container } from 'semantic-ui-react';
import { EventDashboard, NavBar } from '../../features';

export default function App() {
  return (
    <>
      <NavBar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
  );
}
