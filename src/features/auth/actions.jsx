import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { closeModal } from '../modals/actions';

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
      toastr.success('Login Success!');
    } catch (error) {
      throw new SubmissionError({
        _error: 'Login failed: incorrect username or password'
      });
    }
  };
};

export const registerUser = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      // create the user in auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      // update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      });
      // create a new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdUser.uid}`, { ...newUser });
      dispatch(closeModal());
      toastr.success(
        'You registered successfully',
        'Start by logging in to your new account'
      );
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      });
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        });
      }
      toastr.success('Login Success!');
    } catch (error) {
      toastr.error('Login Success!', error);
    }
  };
};

export const updatePassword = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};
