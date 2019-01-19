import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function EventDetailedSidebar({ attendees }) {
  const isHost = false;
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal">
        {attendees && attendees.length}{' '}
        {attendees && attendees.length === 1
          ? ' Person is interested'
          : ' People are interested'}
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map(attendee => (
              <Item key={attendee.id} style={{ position: 'relative' }}>
                {isHost && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right">
                    Creator
                  </Label>
                )}

                <img
                  style={{
                    width: '70px',
                    float: 'left',
                    paddingRight: '20px'
                  }}
                  src={attendee.photoURL}
                  alt="attendee"
                />
                <Item.Content>
                  <Item.Header as="h3">
                    <span style={{ lineHeight: '2em' }}>
                      <Link to={`/profile/${attendee.id}`}>
                        {' '}
                        {attendee.displayName}{' '}
                      </Link>
                    </span>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </div>
  );
}

export default EventDetailedSidebar;
