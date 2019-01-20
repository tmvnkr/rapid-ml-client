const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => {
  return {
    type: type,
    eventDate: newEvent.date,
    hostedBy: newEvent.hostedBy,
    title: newEvent.title,
    photoURL: newEvent.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: newEvent.hostUid,
    eventId: event.id
  };
};

exports.createActivity = functions.firestore
  .document('collections/{eventId}')
  .onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = newActivity('newEvent', newEvent, event.id);

    console.log(activity);

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with ID: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });

exports.cancelActivity = functions.firestore
  .document('collections/{eventId}')
  .onUpdate((event, context) => {
    let updatedEvent = event.after.data();
    let previousEventData = event.before.data();
    console.log({ event });
    console.log({ context });
    console.log({ updatedEvent });
    console.log({ previousEventData });

    if (
      !updatedEvent.cancelled ||
      updatedEvent.cancelled === previousEventData.cancelled
    )
      return false;

    const activity = newActivity(
      'cancelledEvent',
      updatedEvent,
      context.params.eventId
    );

    console.log({ activity });

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with ID: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });
