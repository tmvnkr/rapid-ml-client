import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const panes = [
  { menuItem: 'All Collections', pane: { key: 'allCollections' } },
  { menuItem: 'Latest Interested', pane: { key: 'latestInterested' } },
  { menuItem: 'Oldest Collections', pane: { key: 'oldestCollections' } },
  { menuItem: 'Created Collections', pane: { key: 'createdCollections' } }
];

const UserDeteiledEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Grid.Column width={16}>
      <Segment attached loading={eventsLoading}>
        <Header icon="images outline" content="Collections" />
        <Tab
          onTabChange={(event, data) => changeTab(event, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />

        <Card.Group itemsPerRow={6}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/collection/${event.id}`} key={event.id}>
                <Image
                  src={
                    event.imageURL ||
                    `/assets/categoryImages/${event.category}.jpg`
                  }
                />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(
                        event.created && event.created,
                        'DD-MM-YYYY HH:mm'
                      )}
                    </div>
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
