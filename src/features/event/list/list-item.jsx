import React from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './list-attendee';

export default function ListItem(props) {
  const { event, deleteEvent } = props;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              {!event.cancelled && (
                <Item.Header as="a">{event.title}</Item.Header>
              )}
              <Item.Description>
                Created by <span>{event.hostedBy}</span>
              </Item.Description>
              {event.cancelled && (
                <Label
                  ribbon="right"
                  color="red"
                  content="User set this message as hidden"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      {!event.cancelled && (
        <>
          <Segment>
            <span>
              <Icon name="clock" /> {format(event.date, 'DD-MM-YYYY')} |
              <Icon name="marker" /> {event.venue}
            </span>
          </Segment>
          <Segment secondary>
            <List horizontal>
              {event.attendees &&
                Object.values(event.attendees).map((attendee, index) => (
                  <EventListAttendee key={index} attendee={attendee} />
                ))}
            </List>
          </Segment>
        </>
      )}
      <Segment clearing>
        {!event.cancelled && <span>{event.description}</span>}
        <Button
          onClick={deleteEvent(event.id)}
          as="a"
          color="red"
          floated="right"
          content="Delete"
        />
        <Button
          as={Link}
          to={`/collection/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
