import React from 'react';
import EventListItem from './list-item';

export default function List(props) {
  const { events } = props;
  return (
    <div>
      <h1>Event List</h1>
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
}
