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
