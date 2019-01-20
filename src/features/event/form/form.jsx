/*global google*/
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import moment from 'moment';
import { withFirestore } from 'react-redux-firebase';
import Script from 'react-load-script';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent, cancelToggle } from '../actions';
import TextInput from '../../../app/common/form/text-input';
import TextArea from '../../../app/common/form/text-area';
import SelectInput from '../../../app/common/form/select-input';
import DateInput from '../../../app/common/form/date-input';
import PlaceInput from '../../../app/common/form/place-input';

const mapState = state => {
  let event = {};

  if (
    state.firestore.ordered.collections &&
    state.firestore.ordered.collections[0]
  ) {
    event = state.firestore.ordered.collections[0];
  }

  return {
    loading: state.async.loading,
    initialValues: event,
    event
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const category = [
  { key: 'phone', text: 'Smartphone', value: 'phone' },
  { key: 'horse', text: 'Horse', value: 'horse' },
  { key: 'banana', text: 'Banana', value: 'banana' },
  { key: 'santa', text: 'Santa Claus', value: 'santa' }
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
    values.venueLatLng = venueLatLng;
    if (props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = props.event.venueLatLng;
      }
      props.updateEvent(values);
      props.history.goBack();
    } else {
      props.createEvent(values);
      props.history.push('/collections');
    }
  };

  const {
    handleSubmit,
    invalid,
    submitting,
    pristine,
    history,
    event,
    cancelToggle,
    loading
  } = props;

  let collection;
  if (event.id) {
    collection = <h1>Manage Collection Information</h1>;
  } else {
    collection = <h1>Create Collection Information</h1>;
  }

  return (
    <Grid>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }&libraries=places`}
        onLoad={handleScriptLoaded}
      />

      <Grid.Column width={10}>
        <Grid.Column width={10} />
        {collection}
        <Segment>
          <Header sub color="teal" content="Collection Details" />
          <Form onSubmit={handleSubmit(onFormSubmit)}>
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
              showYearDropdown={true}
              showMonthDropdown={true}
              dropdownMode="select"
              maxDate={moment().subtract(0, 'years')}
            />
            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit">
              Submit
            </Button>
            <Button onClick={history.goBack} type="button">
              Cancel
            </Button>
            {event.id && (
              <Button
                loading={loading}
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                color={event.cancelled ? 'green' : 'red'}
                type="button"
                floated="right"
                content={
                  event.cancelled ? 'Show collection publicly' : 'Hide event'
                }
              />
            )}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      EventForm
    )
  )
);
