import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './header';
import EventDetailedInfo from './info';
import EventDetailedChat from './chat';
import EventDetailedSidebar from './sidebar';
import { objectToArray } from '../../../app/common/util/helpers';

const mapState = state => {
  let event = {};

  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }

  return {
    event
  };
};

function EventDetailedPage(props) {
  useEffect(() => {
    (async function() {
      try {
        const { firestore, match, history } = props;
        let event = await firestore.get(`collections/${match.params.id}`);
        if (!event.exists) {
          history.push('/collections');
          toastr.error('Oops', 'Collection not found');
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const { event } = props;
  const attendees = event && event.attendees && objectToArray(event.attendees);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );
}

export default withFirestore(connect(mapState)(EventDetailedPage));
