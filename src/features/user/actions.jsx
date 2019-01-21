import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { FETCH_EVENTS } from '../event/constants';
import uuid from 'uuid';
import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish
} from '../async/actions';
import firebase from '../../app/config/firebase';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }
    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Profile updated');
    } catch (error) {
      toastr.error(
        'Error',
        'Something went wrong, profile has not been updated.'
      );
    }
  };
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = uuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    // upload the file to fb storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get the userdoc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    // add the new photo to photos collection
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Profile picture updated');
  } catch (error) {
    toastr.error('Oops', 'Something went wrong, try again');
    dispatch(asyncActionError());
    throw new Error('Problem uploading photo');
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    dispatch(asyncActionStart());
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
    setTimeout(function() {
      dispatch(asyncActionFinish());
      toastr.success('Success', 'Profile photo deleted');
    }, 2000);
  } catch (error) {
    toastr.error('Error', error);
    dispatch(asyncActionError());
    throw new Error('Problem deleting the photo');
  }
};

export const deleteTaggedPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch(asyncActionStart());
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    let userId = await firestore.get({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
    let collectionId = userId.data().collectionId;
    await firestore.update(`collections/${collectionId}`, {
      imageURL: '',
      imageTags: '',
      nsfw: ''
    });
    await firebase.deleteFile(`${user.uid}/tagged_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
    setTimeout(function() {
      dispatch(asyncActionFinish());
      toastr.success('Success', 'Image deleted');
    }, 2000);
  } catch (error) {
    dispatch(asyncActionError());
    toastr.error('Error', error);
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = photo => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const today = Math.round(new Date().getTime());
  let userDocRef = firestore.collection('users').doc(user.uid);
  let eventAttendeeRef = firestore.collection('collection_interested');
  try {
    let batch = firestore.batch();

    await batch.update(userDocRef, {
      photoURL: photo.url
    });

    let eventQuery = await eventAttendeeRef
      .where('userUid', '==', user.uid)
      .where('eventCreated', '<', today);

    let eventQuerySnap = await eventQuery.get();

    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
        .collection('collections')
        .doc(eventQuerySnap.docs[i].data().eventId);
      let event = await eventDocRef.get();
      if (event.data().hostUid === user.uid) {
        batch.update(eventDocRef, {
          hostPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      } else {
        batch.update(eventDocRef, {
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      }
    }
    await batch.commit();
    dispatch(asyncActionFinish());
    toastr.success('Success', 'Profile photo updated');
  } catch (error) {
    dispatch(asyncActionError());
    toastr.error('Error', 'Problem setting main photo');
    throw new Error('Problem setting main photo');
  }
};

export const goingToEvent = event => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
    const attendee = {
      going: true,
      joinDate: Date.now(),
      photoURL: profile.photoURL || '/assets/user.png',
      displayName: user.displayName,
      host: false
    };
    try {
      let eventDocRef = firestore.collection('collections').doc(event.id);
      let eventAttendeeDocRef = firestore
        .collection('collection_interested')
        .doc(`${event.id}_${user.uid}`);

      await firestore.runTransaction(async transaction => {
        await transaction.get(eventDocRef);
        await transaction.update(eventDocRef, {
          [`attendees.${user.uid}`]: attendee
        });
        await transaction.set(eventAttendeeDocRef, {
          eventId: event.id,
          userUid: user.uid,
          eventDate: event.date,
          host: false,
          interestDate: Date.now()
        });
      });
      dispatch(asyncActionFinish());
      toastr.success('Success', `You have showed interest for ${event.title}`);
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error('Oops', 'Something went wront');
    }
  };
};

export const cancelGoingToEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.update(`collections/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`collection_interested/${event.id}_${user.uid}`);
      toastr.success(
        'Success',
        `You are no longer interested in ${event.title}`
      );
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const getUserEvents = (userUid, activeTab) => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    let eventsRef = firestore.collection('collection_interested');
    let query;
    switch (activeTab) {
      case 1: // Newest Interested
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('interestDate', 'desc');
        break;
      case 2: // Oldest Collections
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('eventCreated', 'asc');
        break;
      case 3: // Created
        query = eventsRef
          .where('userUid', '==', userUid)
          .where('host', '==', true)
          .orderBy('eventCreated', 'desc');
        break;
      default:
        // All
        query = eventsRef
          .where('userUid', '==', userUid)
          .orderBy('eventCreated', 'desc');
    }
    try {
      let querySnap = await query.get();
      let events = [];

      for (let i = 0; i < querySnap.docs.length; i++) {
        let evt = await firestore
          .collection('collections')
          .doc(querySnap.docs[i].data().eventId)
          .get();
        events.push({ ...evt.data(), id: evt.id });
      }

      dispatch({ type: FETCH_EVENTS, payload: { events } });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};

export const followUser = userToFollow => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'unknown city',
    displayName: userToFollow.displayName
  };
  try {
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'following', doc: userToFollow.id }]
      },
      following
    );
    toastr.success('Hooray!', `You are now following ${following.displayName}`);
  } catch (error) {}
};

export const unfollowUser = userToUnfollow => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'following', doc: userToUnfollow.id }]
    });
    toastr.success('Success', `Unfollowed`);
  } catch (error) {}
};
