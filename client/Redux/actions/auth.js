import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import axios from 'axios';
// import { setAlert } from './alert';
import setAuthToken from '../setAuthToken';
import { AsyncStorage } from 'react-native';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';


//  Load User
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

    dispatch(getCurrentProfile());
  } catch (err) {
    // console.log(err.response.data);
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

  const body = { name, email, password };
  try {
    const res = await axios.post(
      `http://${ipAddress}:3000/api/signup`,
      body,
      config
    );

    dispatch(loading(true))

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    
    await AsyncStorage.setItem('token', res.data.token);
    
    dispatch(createProfile({ name }));
    
    dispatch(loadUser());
    
    dispatch(loading(false))
  
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      console.log('error from signup', errors);
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
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
    const res = await axios.post(
      `http://${ipAddress}:3000/api/login`,
      body,
      config
    );

    dispatch(loading(true))

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    
    dispatch(loadUser());
    
    
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      try{
        dispatch(getCurrentProfile());
      }catch{
        
      }
    }

    dispatch(loading(false))
  
  } catch (err) {
    const errors = err.response.data.errors; // This errors will come from backend
    // that we setted as errors.array
    if (errors) {
      console.log('error from login', errors);
      errors.forEach((error) => {
        try{
          dispatch(setAlert(error.msg, 'danger'));
        }catch(e){
          
        }
      });
    }
  }
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch(loading(true))
  dispatch({ type: LOGOUT });
  dispatch(loading(false))
};
