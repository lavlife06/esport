import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  // ACCOUNT_DELETED,
} from '../actions/types';

import { AsyncStorage } from 'react-native';

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log('LOGIN/REGISTER-SUCCESSFULL');
      AsyncStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      console.log('USERLOADING-SUCCESSFULL');
      return {
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      console.log('LOGIN/REGISTER-SUCCESSFULL');
      return {
        payload,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      AsyncStorage.removeItem('token');
      console.log('AUTHERROR-SUCCESSFULL');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      AsyncStorage.removeItem('token');
      console.log('LOUGOUT-SUCCESSFULL');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
