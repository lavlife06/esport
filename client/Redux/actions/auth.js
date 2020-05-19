import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // LOGOUT,
} from './types';
import axios from 'axios';
// import { setAlert } from './alert';
import setAuthToken from '../setAuthToken';
import { AsyncStorage } from 'react-native';
import { ipAddress } from '../ipaddress';
import { setAlert } from './alert';

//  Load User


// Register user
export const register = (name, email, password ) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { name, email, password };
  try {
    const res = await axios.post(
      `http://${ipAddress}:3000/api/signup`,
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    
    dispatch(loadUser())
    
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      // console.log("signup error: ",errors);
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  // set header
  const token = await AsyncStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  } else {
    console.log('notoken');
  }
  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/login`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: AUTH_ERROR,
    });
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
    const res = await axios.post(
      `http://${ipAddress}:3000/api/login`,
      body,
      config
    );
    await AsyncStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors; // This errors will come from backend
    // that we setted as errors.array
    if (errors) {
      console.log('error from login', errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
