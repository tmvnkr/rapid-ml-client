import React, { Component } from 'react';
import { Feed, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class EventActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <div>
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            has created{' '}
            <Link to={{ pathname: '/collection/' + activity.eventId }}>
              {activity.title}
            </Link>
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            has hidden a collection
          </div>
        );
      case 'imageUpload':
        return (
          <div>
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            has uploaded an image to{' '}
            <Link to={{ pathname: '/collection/' + activity.eventId }}>
              {activity.title}
            </Link>
            <Feed.Extra images>
              <Image
                style={{ width: '40%', height: '40%' }}
                src={activity.imageURL}
              />
            </Feed.Extra>
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt="" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(activity.timestamp)} ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default EventActivityItem;
