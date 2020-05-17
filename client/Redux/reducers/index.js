import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import googleAuthReducer from './googleAuthReducer';

export default combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  profile: profileReducer,
  googleAuth: googleAuthReducer,
});
