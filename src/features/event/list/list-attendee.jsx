import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ListAttendee(props) {
  const { attendee } = props;
  return (
    <List.Item>
      <Image
        as={Link}
        to={`/profile/${attendee.id}`}
        size="mini"
        rounded
        src={attendee.photoURL}
      />
    </List.Item>
  );
}
