import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../actions';
import uuid from 'uuid';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';

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
  const onFormSubmit = evt => {
    evt.preventDefault();
    if (props.event.id) {
      props.updateEvent(props.event);
      props.history.goBack();
    } else {
      const newEvent = {
        ...props.event,
        id: uuid(),
        hostPhotoURL: 'assets/user.png'
      };
      props.createEvent(newEvent);
      props.history.push('/collections');
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header sub color="teal" content="Collection Details" />
          <Form>
            <Field
              name="title"
              type="text"
              component={TextInput}
              placeholder="Give this collection a name"
            />
            <Field
              name="category"
              type="text"
              component={TextInput}
              placeholder="What is this collection about"
            />
            <Field
              name="description"
              type="text"
              rows={3}
              component={TextArea}
              placeholder="Tell use about this collection"
            />
            <Header sub color="teal" content="Collection Location Details" />
            <Field
              name="city"
              type="text"
              component={TextInput}
              placeholder="Collection city"
            />
            <Field
              name="venue"
              type="text"
              component={TextInput}
              placeholder="Collection venue"
            />
            <Field
              name="date"
              type="text"
              component={TextInput}
              placeholder="Collection date"
            />
            <Button onClick={onFormSubmit} positive type="submit">
              Submit
            </Button>
            <Button onClick={props.history.goBack} type="button">
              Cancel
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: 'eventForm' })(EventForm));
