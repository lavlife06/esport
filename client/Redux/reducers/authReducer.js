import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  // LOGOUT,
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
      AsyncStorage.setItem('token', payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
        token: payload.token,
      };
    case USER_LOADED:
      return {
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        payload,
        isAuthenticated: false,
        loading: true,
      };
    case AUTH_ERROR:
      AsyncStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
      };
    // case LOGOUT:
    //   AsyncStorage.removeItem('token');
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //     user: null,
    //   };
    default:
      return state;
  }
};
