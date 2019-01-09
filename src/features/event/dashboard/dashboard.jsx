import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../list/list';
import EventForm from '../form/form';
import uuid from 'uuid';
import { createEvent, deleteEvent, updateEvent } from '../actions';

const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};

function Dashboard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  let { events } = props;

  const handleFormOpen = () => {
    setSelectedEvent(null);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleUpdateEvent = updatedEvent => {
    props.updateEvent(updatedEvent);
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenEvent = eventToOpen => () => {
    setSelectedEvent(eventToOpen);
    setIsOpen(true);
  };

  const handleCreateEvent = newEvent => {
    newEvent.id = uuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    props.createEvent(newEvent);
    setIsOpen(false);
  };

  const handleDeleteEvent = eventId => () => {
    props.deleteEvent(eventId);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          deleteEvent={handleDeleteEvent}
          onEventOpen={handleOpenEvent}
          events={events}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          onClick={handleFormOpen}
          color="orange"
          content="Create Collection"
        />
        {isOpen && (
          <EventForm
            updateEvent={handleUpdateEvent}
            selectedEvent={selectedEvent}
            createEvent={handleCreateEvent}
            handleCancel={handleCancel}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(Dashboard);
