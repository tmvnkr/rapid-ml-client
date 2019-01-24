import React, { useState } from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react'
import EventDetailedMap from './map'
import format from 'date-fns/format'

function EventDetailedInfo({ event }) {
  const [showMap, setShowMap] = useState(false)

  const showMapToggle = () => {
    setShowMap(!showMap)
  }
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="orange" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <h4>Description</h4>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="orange" />
          </Grid.Column>
          <Grid.Column width={15}>
            <h4>Collection taken date</h4>
            <span>{format(event.date, 'dddd Do MMMM')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="orange" />
          </Grid.Column>
          <Grid.Column width={11}>
            <h4>Collection location</h4>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              onClick={showMapToggle}
              color="orange"
              size="tiny"
              content={showMap ? 'Hide Map' : 'Show Map'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {showMap && <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} />}
    </Segment.Group>
  )
}

export default EventDetailedInfo
