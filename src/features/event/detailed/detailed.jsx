import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './header';
import EventDetailedInfo from './info';
import EventDetailedChat from './chat';
import EventDetailedSidebar from './sidebar';
import EventDetailedTaggedImage from './tagged-image';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/actions';
import { openModal } from '../../modals/actions';
import { addEventComment } from '../actions';

const mapState = (state, ownProps) => {
  let event = {};

  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }

  return {
    event,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  openModal,
  addEventComment
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

  const {
    event,
    auth,
    goingToEvent,
    cancelGoingToEvent,
    addEventComment,
    eventChat
  } = props;
  const attendees = event && event.attendees && objectToArray(event.attendees);
  const isHost = event.hostUid === auth.uid;
  const isGoing =
    attendees && attendees.some(attendee => attendee.id === auth.uid);

  return (
    <Grid>
      <Grid.Column width={11}>
        <EventDetailedHeader
          event={event}
          isHost={isHost}
          isGoing={isGoing}
          goingToEvent={goingToEvent}
          cancelGoingToEvent={cancelGoingToEvent}
        />
        <EventDetailedTaggedImage event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat
          addEventComment={addEventComment}
          eventId={event.id}
          eventChat={eventChat}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage);
