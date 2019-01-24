import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'
import EventDetailedHeader from './header'
import EventDetailedInfo from './info'
import EventDetailedChat from './chat'
import EventDetailedSidebar from './sidebar'
import EventDetailedTaggedImage from './tagged-image'
import { objectToArray, createDataTree } from '../../../app/common/util/helpers'
import LoadingComponent from '../../../app/layout/loading'
import { goingToEvent, cancelGoingToEvent } from '../../user/actions'
import { openModal } from '../../modals/actions'
import { addEventComment } from '../actions'

const mapState = (state, ownProps) => {
  let event = {}

  if (state.firestore.ordered.collections && state.firestore.ordered.collections[0]) {
    event = state.firestore.ordered.collections[0]
  }

  return {
    requesting: state.firestore.status.requesting,
    event,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  }
}

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  openModal,
  addEventComment
}

function EventDetailedPage(props) {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const { firestore, match } = props
    ;(async function() {
      try {
        let event = await firestore.get(`collections/${match.params.id}`)
        if (!event.exists) {
          toastr.error('Not found', 'Collection not found')
          props.history.push('/error')
        }
        await firestore.setListener(`collections/${match.params.id}`)
        setInitialLoading(false)
      } catch (error) {
        console.error(error)
      }
    })()
    return function cleanup() {
      firestore.unsetListener(`collections/${match.params.id}`)
    }
  }, [])

  const {
    requesting,
    loading,
    event,
    auth,
    goingToEvent,
    cancelGoingToEvent,
    addEventComment,
    eventChat,
    match
  } = props
  const attendees =
    event &&
    event.attendees &&
    objectToArray(event.attendees).sort(function(a, b) {
      return a.joinDate - b.joinDate
    })
  const isHost = event.hostUid === auth.uid
  const isGoing = attendees && attendees.some(attendee => attendee.id === auth.uid)
  const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)
  const loadingCollection = requesting[`events/${match.params.id}`]

  if (loadingCollection || initialLoading) return <LoadingComponent inverted={true} />
  return (
    <Grid>
      <Grid.Column width={11}>
        <EventDetailedHeader
          loading={loading}
          event={event}
          isHost={isHost}
          isGoing={isGoing}
          goingToEvent={goingToEvent}
          cancelGoingToEvent={cancelGoingToEvent}
        />
        <EventDetailedTaggedImage event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat
          addEventComment={addEventComment}
          eventId={event.id}
          eventChat={chatTree}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <EventDetailedSidebar attendees={attendees} />
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailedPage)
