import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './header';
import EventDetailedInfo from './info';
import EventDetailedChat from './chat';
import EventDetailedSidebar from './sidebar';
import TEST from './testElement';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/actions';

const mapState = state => {
  let event = {};

  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }

  return {
    event,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

function EventDetailedPage(props) {
  useEffect(() => {
    const { firestore, match } = props;
    (async function() {
      try {
        await firestore.setListener(`collections/${match.params.id}`);
      } catch (error) {
        console.error(error);
      }
    })();
    return function cleanup() {
      firestore.unsetListener(`collections/${match.params.id}`);
    };
  }, []);

  const { event, auth, goingToEvent, cancelGoingToEvent } = props;
  const attendees = event && event.attendees && objectToArray(event.attendees);
  const isHost = event.hostUid === auth.uid;
  const isGoing =
    attendees && attendees.some(attendee => attendee.id === auth.uid);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          isHost={isHost}
          isGoing={isGoing}
          goingToEvent={goingToEvent}
          cancelGoingToEvent={cancelGoingToEvent}
        />
        <TEST event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(EventDetailedPage)
);
