import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../list/list';
import EventForm from '../form/form';

export default function Dashboard() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button color="orange" content="Create Event" />
        <EventForm />
      </Grid.Column>
    </Grid>
  );
}
