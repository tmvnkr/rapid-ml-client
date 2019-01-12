import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './map';

function EventDetailedInfo({ event }) {
  const [showMap, setShowMap] = useState(false);

  const showMapToggle = () => {
    setShowMap(!showMap);
  };
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{event.date}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="tag" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <div
              style={{
                width: '99%',
                height: 'auto',
                backgroundColor: '#9c9c9c'
              }}>
              <b>Banana 99%</b>
            </div>
            <div
              style={{
                width: '49%',
                height: 'auto',
                backgroundColor: '#bfbfbf'
              }}>
              <b>Fish 49%</b>
            </div>
            <div
              style={{
                width: '25%',
                height: 'auto',
                backgroundColor: '#d4d4d4'
              }}>
              <b>Hat 25%</b>
            </div>
            <div
              style={{
                width: '10%',
                height: 'auto',
                backgroundColor: '#dcdcdc'
              }}>
              <b>Santa 10%</b>
            </div>
            <div
              style={{
                width: '5%',
                height: 'auto',
                backgroundColor: '#ebebeb'
              }}>
              <b>Car 5%</b>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={showMapToggle}
              color="teal"
              size="tiny"
              content={showMap ? 'Hide Map' : 'Show Map'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {showMap && (
        <EventDetailedMap
          lat={event.venueLatLng.lat}
          lng={event.venueLatLng.lng}
        />
      )}
    </Segment.Group>
  );
}

export default EventDetailedInfo;
