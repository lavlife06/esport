import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import googleAuthReducer from './googleAuthReducer';
import alertReducer from './alertReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  profile: profileReducer,
  googleAuth: googleAuthReducer,
  alert: alertReducer,
  event: eventReducer,
});
