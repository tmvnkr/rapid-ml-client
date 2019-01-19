import React from 'react';
import {
  Segment,
  Item,
  Icon,
  List,
  Button,
  Label,
  Image
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './list-attendee';
import { objectToArray } from '../../../app/common/util/helpers';

export default function ListItem(props) {
  const { event } = props;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" rounded src={event.hostPhotoURL} inline />
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
      {event.imageURL && (
        <Segment>
          <Image src={event.imageURL} fluid />
        </Segment>
      )}
      {!event.cancelled && (
        <>
          <Segment>
            <span>
              <Icon name="clock outline" /> {format(event.date, 'DD-MM-YYYY')}
              {'  |  '}
              <Icon name="map outline" /> {event.venue}
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
