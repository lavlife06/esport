import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import googleAuthReducer from './googleAuthReducer';

export default combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  googleAuth: googleAuthReducer
});
