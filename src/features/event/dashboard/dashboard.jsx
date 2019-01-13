import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteEvent } from '../actions';
import EventList from '../list/list';
import LoadingComponent from '../../../app/layout/loading';
import CollectionActivity from '../activity/activity';

const mapState = state => ({
  events: state.firestore.ordered.collections,
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
      <Grid.Column width={6}>
        <CollectionActivity />
      </Grid.Column>
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'collections' }])(Dashboard));
