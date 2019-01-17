import React from 'react';
import EventListItem from './list-item';
import InfiniteScroll from 'react-infinite-scroller';

export default function List(props) {
  const { events, getNextEvents, moreEvents, loading } = props;
  return (
    <div>
      {events && events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}>
          {events &&
            events.map(event => <EventListItem key={event.id} event={event} />)}
        </InfiniteScroll>
      )}
    </div>
  );
}
