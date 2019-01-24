import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import UserDetailedHeader from './header'
import UserDetailedDescription from './description'
import UserDetailedPhotos from './photos'
import UserDetailedSidebar from './sidebar'
import UserDetailedEvents from './events'
import { userDetailedQuery } from '../queries'
import LoadingComponent from '../../../app/layout/loading'
import { getUserEvents, followUser, unfollowUser } from '../actions'

const mapState = (state, ownProps) => {
  let userUid = null
  let profile = {}

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
    userUid = ownProps.match.params.id
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following
  }
}

const actions = {
  getUserEvents,
  followUser,
  unfollowUser
}

class UserDetailedPage extends Component {
  async componentDidMount() {
    let user = await this.props.firestore.get(`users/${this.props.match.params.id}`)
    if (!user.exists) {
      toastr.error('Not found', 'User not found')
      this.props.history.push('/error')
    }
  }

  changeTab = (event, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex)
  }

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading,
      followUser,
      following,
      unfollowUser
    } = this.props
    const isCurrentUser = auth.uid === match.params.id
    const loading = requesting[`users/${match.params.id}`]
    const isFollowing = !isEmpty(following)

    if (loading) return <LoadingComponent inverted={true} />
    return (
      <Grid>
        <UserDetailedHeader following={following} profile={profile} photos={photos} />
        <UserDetailedSidebar
          unfollowUser={unfollowUser}
          isFollowing={isFollowing}
          profile={profile}
          followUser={followUser}
          isCurrentUser={isCurrentUser}
        />

        <UserDetailedDescription profile={profile} />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents
          events={events}
          eventsLoading={eventsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    )
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid, match) => userDetailedQuery(auth, userUid, match))
)(UserDetailedPage)
