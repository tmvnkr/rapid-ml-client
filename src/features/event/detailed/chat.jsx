import React, { useState } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import EventDetailedChatForm from './chat-form';
import distanceInWords from 'date-fns/distance_in_words';
import { Link } from 'react-router-dom';

function EventDetailedChat({ addEventComment, eventId, eventChat }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleOpenReplyForm = () => {
    setShowReplyForm(true);
  };

  return (
    <div>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}>
        <Header>Chat about this image</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {eventChat &&
            eventChat.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{distanceInWords(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={handleOpenReplyForm}>
                      Reply
                    </Comment.Action>
                    {showReplyForm && (
                      <EventDetailedChatForm
                        addEventComment={addEventComment}
                        eventId={eventId}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailedChatForm
          addEventComment={addEventComment}
          eventId={eventId}
        />
      </Segment>
    </div>
  );
}

export default EventDetailedChat;
