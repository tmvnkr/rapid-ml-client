// import React, { useState, useEffect, useRef } from 'react';
// import { Grid, Button } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { getEventsForDashboard } from '../actions';
// import EventList from '../list/list';
// import LoadingComponent from '../../../app/layout/loading';
// import CollectionActivity from '../activity/activity';
// import { stringify } from 'querystring';

// const mapState = state => ({
//   events: state.events,
//   loading: state.async.loading
// });

// const actions = {
//   getEventsForDashboard
// };

// function Dashboard(props) {
//   const [moreEvents, setMoreEvents] = useState(false);
//   const [loadingInitial, setLoadingInitial] = useState(true);
//   const [loadedEvents, setLoadedEvents] = useState([]);

//   const { loading } = props;

//   const prevProps = usePrevious(props.events);

//   useEffect(() => {
//     (async function() {
//       let next = await props.getEventsForDashboard();
//       if (next && next.docs && next.docs.length > 1) {
//         setMoreEvents(true);
//         setLoadingInitial(false);
//       }
//     })();
//   }, []);

//   useEffect(
//     () => {
//       setLoadedEvents([...loadedEvents, ...props.events]);
//     },
//     [props.events]
//   );
//   console.log('state', loadedEvents);

//   const getNextEvents = async () => {
//     const { events } = props;
//     let lastEvent = events && events[events.length - 1];
//     let next = await props.getEventsForDashboard(lastEvent);
//     if (next && next.docs && next.docs.length <= 1) {
//       setMoreEvents(false);
//     }
//   };

//   if (loadingInitial) return <LoadingComponent inverted={true} />;
//   const handleDeleteEvent = eventId => () => {
//     props.deleteEvent(eventId);
//   };

//   return (
//     <Grid>
//       <Grid.Column width={10}>
//         <EventList deleteEvent={handleDeleteEvent} events={loadedEvents} />
//         <Button
//           loading={loading}
//           onClick={getNextEvents}
//           disabled={!moreEvents}
//           content="More"
//           color="green"
//           floated="right"
//         />
//       </Grid.Column>
//       <Grid.Column width={6}>
//         <CollectionActivity />
//       </Grid.Column>
//     </Grid>
//   );
// }

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

// export default connect(
//   mapState,
//   actions
// )(firestoreConnect([{ collection: 'collections' }])(Dashboard));

import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getEventsForDashboard } from '../actions';
import EventList from '../list/list';
import LoadingComponent from '../../../app/layout/loading';
import EventActivity from '../activity/activity';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            loading={loading}
            moreEvents={moreEvents}
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'collections' }])(EventDashboard));
