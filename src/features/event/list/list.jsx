import React from 'react';
import EventListItem from './list-item';

export default function List(props) {
  const { events, onEventOpen, deleteEvent } = props;
  return (
    <div>
      <h1>Collection List</h1>
      {events.map(event => (
        <EventListItem
          key={event.id}
          event={event}
          onEventOpen={onEventOpen}
          deleteEvent={deleteEvent}
        />
      ))}
    </div>
  );
}
