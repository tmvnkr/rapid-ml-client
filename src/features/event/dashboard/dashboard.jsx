import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../list/list';
import EventForm from '../form/form';
import uuid from 'uuid';

const eventsDashboard = [
  {
    id: '1',
    title: 'Pictures of my appartment',
    date: '2018-03-27',
    category: 'houses',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'Emmen, NL',
    venue: 'Kapelstraat 121H',
    hostedBy: 'Tim',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Tim',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Marin',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Pictures of (a) Stone',
    date: '2018-03-28',
    category: 'stones',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'Emmen, NL',
    venue: 'Stones',
    hostedBy: 'Marin',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Marin',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Tim',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];

export default function Dashboard() {
  const [events, setEvents] = useState(eventsDashboard);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleFormOpen = () => {
    setSelectedEvent(null);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleUpdateEvent = updatedEvent => {
    setEvents(
      events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        } else {
          return event;
        }
      })
    );
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenEvent = eventToOpen => () => {
    setSelectedEvent(eventToOpen);
    setIsOpen(true);
  };

  const handleCreateEvent = newEvent => {
    newEvent.id = uuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setIsOpen(false);
  };

  const handleDeleteEvent = eventId => () => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          deleteEvent={handleDeleteEvent}
          onEventOpen={handleOpenEvent}
          events={events}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          onClick={handleFormOpen}
          color="orange"
          content="Create Collection"
        />
        {isOpen && (
          <EventForm
            updateEvent={handleUpdateEvent}
            selectedEvent={selectedEvent}
            createEvent={handleCreateEvent}
            handleCancel={handleCancel}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
