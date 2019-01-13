import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
      updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
    }
    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Your profile has been updated');
    } catch (error) {
      console.log(error);
    }
  };
};
