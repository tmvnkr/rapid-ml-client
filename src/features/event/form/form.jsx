import React, { useState, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

export default function EventForm(props) {
  const emptyEvent = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  const [event, setEvent] = useState(emptyEvent);

  useEffect(
    () => {
      if (props.selectedEvent !== null) {
        setEvent(props.selectedEvent);
      } else {
        setEvent(emptyEvent);
      }
    },
    [props.selectedEvent]
  );

  const onFormSubmit = evt => {
    evt.preventDefault();
    if (event.id) {
      props.updateEvent(event);
    } else {
      props.createEvent(event);
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
          <label>Event Title</label>
          <input
            name="title"
            onChange={onInputChange}
            value={event.title}
            placeholder="Event Title"
          />
        </Form.Field>
        <Form.Field>
          <label>Event Date</label>
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
          <label>Hosted By</label>
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
        <Button onClick={handleCancel} type="button">
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}
