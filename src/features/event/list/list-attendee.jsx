import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default function ListAttendee(props) {
  const { attendee } = props;
  return (
    <List.Item>
      <Image as="a" size="mini" circular src={attendee.photoURL} />
    </List.Item>
  );
}
