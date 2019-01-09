import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './header';
import EventDetailedInfo from './info';
import EventDetailedChat from './chat';
import EventDetailedSidebar from './sidebar';

function EventDetailedPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader />
        <EventDetailedInfo />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
}

export default EventDetailedPage;
