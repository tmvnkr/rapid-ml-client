import React from 'react';
import EventListItem from './list-item';

export default function List() {
  return (
    <div>
      <h1>Event List</h1>
      <EventListItem />
      <EventListItem />
      <EventListItem />
    </div>
  );
}
