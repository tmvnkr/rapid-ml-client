/*global google*/
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import moment from 'moment';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../actions';
import uuid from 'uuid';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';
import SelectInput from '../../../app/common/form/select-input';
import DateInput from '../../../app/common/form/date-input';
import PlaceInput from '../../../app/common/form/place-input';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const actions = {
  createEvent,
  updateEvent
};

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

function EventForm(props) {
  const [cityLatLng, setCityLatLng] = useState({});
  const [venueLatLng, setVenueLatLng] = useState({});
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleScriptLoaded = () => setScriptLoaded(true);

  const handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        setCityLatLng(latlng);
      })
      .then(() => {
        props.change('city', selectedCity);
      });
  };

  const handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        setVenueLatLng(latlng);
      })
      .then(() => {
        props.change('venue', selectedVenue);
      });
  };

  const onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = venueLatLng;
    if (props.initialValues.id) {
      props.updateEvent(values);
      props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: uuid(),
        hostPhotoURL: 'assets/user.png',
        hostedBy: 'Bob'
      };
      props.createEvent(newEvent);
      props.history.push('/collections');
    }
  };

  const { invalid, submitting, pristine } = props;

  return (
    <Grid>
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBaVaE8gaTo3uAlRadUvSUnT9JdabmMYQY&libraries=places"
        onLoad={handleScriptLoaded}
      />
      <Grid.Column width={10}>
        <Segment>
          <Header sub color="teal" content="Collection Details" />
          <Form onSubmit={props.handleSubmit(onFormSubmit)}>
            <Field
              name="title"
              type="text"
              component={TextInput}
              placeholder="Give this collection a name"
            />
            <Field
              name="category"
              type="text"
              component={SelectInput}
              options={category}
              // multiple={true}
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
              component={PlaceInput}
              options={{ types: ['(cities)'] }}
              placeholder="Collection city"
              onSelect={handleCitySelect}
            />
            {scriptLoaded && (
              <Field
                name="venue"
                type="text"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                placeholder="Collection venue"
                onSelect={handleVenueSelect}
              />
            )}
            <Field
              name="date"
              type="text"
              component={DateInput}
              dateFormat="YYYY-MM-DD"
              placeholder="Collection date"
            />
            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit">
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
)(
  reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
    EventForm
  )
);
