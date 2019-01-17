import { toastr } from 'react-redux-toastr';
import { DELETE_EVENT, FETCH_EVENTS } from './constants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/actions';
import { fetchSampleData } from '../../app/data/mockAPI';
import { createNewEvent } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`collections`, newEvent);
      await firestore.set(
        `collection_interested/${createdEvent.id}_${user.uid}`,
        {
          eventId: createdEvent.id,
          userUid: user.uid,
          eventDate: event.date,
          host: true
        }
      );
      toastr.success('Success', 'Event has been created');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`collections/${event.id}`, event);
      toastr.success('Success!', 'Collection has been updated!');
    } catch (error) {
      toastr.error('Oops!', 'Something went wrong');
    }
  };
};

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    // const message = cancelled
    //   ? 'Are you sure you want to hide the collection?'
    //   : 'This will show the event in the collections page again, are you sure?';
    try {
      await firestore.update(`collections/${eventId}`, {
        cancelled: cancelled
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getEventsForDashboard = lastEvent => {
  return async (dispatch, getState) => {
    let today = new Date(Date.now());
    const firestore = firebase.firestore();
    const eventsRef = firestore.collection('collections');
    try {
      dispatch(asyncActionStart());
      let startAfter =
        lastEvent &&
        (await firestore
          .collection('collections')
          .doc(lastEvent.id)
          .get());
      let query;

      lastEvent
        ? (query = eventsRef
            .where('date', '>=', today)
            .orderBy('date')
            .startAfter(startAfter)
            .limit(2))
        : (query = eventsRef
            .where('date', '>=', today)
            .orderBy('date')
            .limit(2));

      let querySnap = await query.get();

      if (querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return querySnap;
      }

      let events = [];

      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
        events.push(evt);
      }
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
      return querySnap;
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
