import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

function EventDetailedHeader({
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent
}) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: 'white' }}
                />
                <p>
                  Created by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <>
            {isGoing ? (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Cancel My Place
              </Button>
            ) : (
              <Button onClick={() => goingToEvent(event)} color="teal">
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}
        {isHost && (
          <>
            <Button as={Link} to={`/manage/${event.id}`} color="orange">
              Manage Event
            </Button>
            <Button as={Link} to={`/imageUpload/${event.id}`} color="green">
              Upload Image
            </Button>
          </>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default EventDetailedHeader;
