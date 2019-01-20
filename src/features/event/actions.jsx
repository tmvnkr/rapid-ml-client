import { toastr } from 'react-redux-toastr';
import uuid from 'uuid';
import { FETCH_EVENTS } from './constants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/actions';
import { createNewEvent } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';
import request from 'request';

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
          host: true,
          eventCreated: Date.now(),
          interestDate: Date.now()
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

export const uploadImage = (file, fileName, event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = uuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/tagged_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    // upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    const apiKey = 'acc_3c47f36a59b801b';
    const apiSecret = '8d6dbf63b22129bbbcea0aa0dd861b54';
    const imageUrl = downloadURL;
    await request
      .get(
        `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(
          imageUrl
        )}`,
        function(error, response, body) {
          let imageTags = body;
          firestore.update(`collections/${event}`, {
            imageURL: downloadURL,
            imageTags: imageTags
          });
        }
      )
      .auth(apiKey, apiSecret, true);
    // get collectionDoc
    let userDoc = await firestore.get(`users/${user.uid}`);
    // get tags from api with downloadURL and store in collection
    // check if collection has a photo, if not update imageURL field with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add the new photo as to photos collection
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL,
        collectionId: event
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error('Problem uploading image');
  }
};

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      dispatch(asyncActionStart());
      await firestore.update(`collections/${eventId}`, {
        cancelled: cancelled
      });
      setTimeout(function() {
        dispatch(asyncActionFinish());
        toastr.success('Success!', 'Collection visibility has been changed!');
      }, 3000);
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

export const getEventsForDashboard = lastEvent => {
  return async (dispatch, getState) => {
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
            .orderBy('created', 'desc')
            .startAfter(startAfter)
            .limit(2))
        : (query = eventsRef.orderBy('created', 'desc').limit(4));

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

export const addEventComment = (eventId, values, parentId) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      parentId: parentId,
      displayName: profile.displayName,
      photoURL: profile.photoURL || 'assets/user.png',
      uid: user.uid,
      text: values.comment,
      date: Date.now()
    };
    try {
      await firebase.push(`event_chat/${eventId}`, newComment);
      toastr.success('Yeey!', 'Comment added');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Problem adding comment');
    }
  };
};
