import React from 'react';
import EventListItem from './list-item';

export default function List(props) {
  const { events, deleteEvent } = props;
  return (
    <div>
      {events.map(event => (
        <EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
      ))}
    </div>
  );
}
