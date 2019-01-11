import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../list/list';
import { deleteEvent } from '../actions';

const mapState = state => ({
  events: state.events
});

const actions = {
  deleteEvent
};

function Dashboard(props) {
  const { events } = props;

  const handleDeleteEvent = eventId => () => {
    props.deleteEvent(eventId);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList deleteEvent={handleDeleteEvent} events={events} />
      </Grid.Column>
      <Grid.Column width={6} />
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(Dashboard);
