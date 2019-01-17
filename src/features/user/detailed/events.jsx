import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Collections', pane: { key: 'allEvents' } },
  { menuItem: 'Past Collections', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Collections', pane: { key: 'futureEvents' } },
  { menuItem: 'Created Collections', pane: { key: 'createdEvents' } }
];

const UserDeteiledEvents = ({ events, eventsLoading }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="images outline" content="Collections" />
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
        <br />

        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/collection/${event.id}`} key={event.id}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(event.date && event.date, 'DD-MM-YYYY')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDeteiledEvents;
