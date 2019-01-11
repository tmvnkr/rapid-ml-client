import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../actions';
import uuid from 'uuid';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const actions = {
  createEvent,
  updateEvent
};

function EventForm(props) {
  const [event, setEvent] = useState(Object.assign({}, props.event));

  const onFormSubmit = evt => {
    evt.preventDefault();
    if (event.id) {
      props.updateEvent(event);
      props.history.goBack();
    } else {
      const newEvent = {
        ...event,
        id: uuid(),
        hostPhotoURL: 'assets/user.png'
      };
      props.createEvent(newEvent);
      props.history.push('/collections');
    }
  };

  const onInputChange = evt => {
    const newEvent = event;
    newEvent[evt.target.name] = evt.target.value;
    setEvent(newEvent);
  };

  const { handleCancel } = props;
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label>Collection Title</label>
          <input
            name="title"
            onChange={onInputChange}
            value={event.title}
            placeholder="Event Title"
          />
        </Form.Field>
        <Form.Field>
          <label>Collection Date</label>
          <input
            name="date"
            onChange={onInputChange}
            value={event.date}
            type="date"
            placeholder="Event Date"
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            name="city"
            onChange={onInputChange}
            value={event.city}
            placeholder="City event is taking place"
          />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <input
            name="venue"
            onChange={onInputChange}
            value={event.venue}
            placeholder="Enter the Venue of the event"
          />
        </Form.Field>
        <Form.Field>
          <label>Created By</label>
          <input
            name="hostedBy"
            onChange={onInputChange}
            value={event.hostedBy}
            placeholder="Enter the name of person hosting"
          />
        </Form.Field>
        <Button onClick={onFormSubmit} positive type="submit">
          Submit
        </Button>
        <Button onClick={props.history.goBack} type="button">
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}

export default connect(
  mapState,
  actions
)(EventForm);
