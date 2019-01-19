import moment from 'moment';
import request from 'request';

export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], { id: e[0] }));
  }
};

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || '/assets/user.png',
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || '/assets/user.png',
        displayName: user.displayName,
        host: true
      }
    },
    taggedImage: {
      imageURL: '',
      result: {
        tags: [{ confidence: 100, tag: { en: 'turbine' } }]
      },
      status: { text: '', type: 'success' }
    }
  };
};

export const taggingAPI = downloadURL => {
  const apiKey = 'acc_3c47f36a59b801b';
  const apiSecret = '8d6dbf63b22129bbbcea0aa0dd861b54';
  const imageUrl = downloadURL;

  request
    .get(
      `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(
        imageUrl
      )}`,
      function(error, response, body) {
        JSON.stringify(body);
      }
    )
    .auth(apiKey, apiSecret, true);
};
