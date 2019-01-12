import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/reducer';
import modalsReducer from '../../features/modals/reducer';
import authReducer from '../../features/auth/reducer';
import asyncReducer from '../../features/async/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer
});

export default rootReducer;
