import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_MYPROFILE,
  CLEAR_EVENTS,
} from './types';
import axios from 'axios';
import setAuthToken from '../setAuthToken';
import { AsyncStorage } from 'react-native';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';
import { loading } from './loading';

//  Load User
export const loadUser = () => async (dispatch) => {
  // set header
  // dispatch(loading(true))
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    console.log('token set successfull');
    try {
      dispatch(loading(true));
      const res = await axios.get(`http://${ipAddress}:3000/api/login`);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      dispatch(loading(false));
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    console.log('notoken');
  }
  // dispatch(loading(false))
  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/login`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    dispatch(getCurrentProfile());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    dispatch(loading(true));
    const res = await axios.post(
      `http://${ipAddress}:3000/api/signup`,
      body,
      config
    );
    dispatch(loading(true));
    console.log('registering....');

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    await AsyncStorage.setItem('token', res.data.token);

    console.log('register succes');

    dispatch(createProfile({ name }));

    dispatch(loadUser());

    dispatch(loading(false));
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
      dispatch(loading(false));
    }
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch(loading(true));
    console.log('wait logging in......');
    const res = await axios.post(
      `http://${ipAddress}:3000/api/login`,
      body,
      config
    );

    dispatch(loading(true));

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    const token = await AsyncStorage.getItem('token');

    if (token) {
      dispatch(getCurrentProfile());
      console.log('token verified by getCurrentProfile');
      dispatch(loading(false));
    }
    if (token.length > 0) {
      try {
        dispatch(getCurrentProfile());
      } catch {}
    }
    console.log('logged in succesfull......');
    dispatch(loading(false));
  } catch (err) {
    const errors = err.response.data.errors; // This errors will come from backend
    // that we setted as errors.array
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
      dispatch(loading(false));
    }
  }
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  dispatch(loading(true));
  await AsyncStorage.removeItem('token');
  dispatch({ type: CLEAR_MYPROFILE });
  dispatch(loading(true));
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_EVENTS });
  dispatch(loading(false));
};
