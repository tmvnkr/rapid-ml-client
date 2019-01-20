import React from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import EventActivityItem from './activity-item';

function CollectionActivity({ activities, contextRef }) {
  return (
    <Sticky style={{ zIndex: '0' }} context={contextRef} offset={100}>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <EventActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
}

export default CollectionActivity;
