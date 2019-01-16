import React from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './list-attendee';
import { objectToArray } from '../../../app/common/util/helpers';

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
                <Item.Header as={Link} to={`/collection/${event.id}`}>
                  {event.title}
                </Item.Header>
              )}
              <Item.Description>
                Created by{' '}
                <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
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
                objectToArray(event.attendees).map(attendee => (
                  <EventListAttendee key={attendee.id} attendee={attendee} />
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
