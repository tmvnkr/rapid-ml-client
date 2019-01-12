import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../list/list';
import { deleteEvent } from '../actions';
import LoadingComponent from '../../../app/layout/loading';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

function Dashboard(props) {
  const { events, loading } = props;

  if (loading) return <LoadingComponent inverted={true} />;
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
