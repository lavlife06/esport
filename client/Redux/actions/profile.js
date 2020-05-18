import {
  GET_MYPROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  MYPROFILE_ERROR,
  SETPARTICULARUSER,
  CLEARPARTICULARUSER,
  CLEAR_PROFILES,
  PARTICULARUSER_ERROR,
  GETPARTICULARUSER,
} from './types';
import axios from 'axios';

// Get current users profile
// This will run when user will login, to save his data in store and use it
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('192.168.0.9:3000/api/profile/me');

    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.response.data.msg);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
// Both will work same because in backend routes we set the profile post req as findOneAndUpdate
// in that upsert was true so if user has no profile then it will be created or update
export const createProfile = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      '192.168.0.9:3000/api/profile/me',
      formData,
      config
    );

    dispatch({
      type: GET_MYPROFILE,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.errors;
    console.error(err.message);

    dispatch({
      type: MYPROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
// will bring bunch of users searched in input
export const getProfiles = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `192.168.0.9:3000/api/profile/user/${username}`
    );

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: PROFILES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
// get info about a particular user
export const getProfileById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`192.168.0.9:3000/api/profile/user/${user_id}`);

    dispatch({
      type: GETPARTICULARUSER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PARTICULARUSER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Delete account & profile
// export const deleteAccount = () => async (dispatch) => {
//   try {
//     await axios.delete('192.168.0.9:3000/api/profile/');

//     dispatch({ type: ACCOUNT_DELETED });

//     dispatch(setAlert('Your account has been permanantly deleted'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // SetParticularUser
// export const setParticularUser = (data) => async (dispatch) => {
//   dispatch({
//     type: SETPARTICULARUSER,
//     payload: data,
//   });
// };

// // ClearParticularUser
// export const clearParticularUser = () => async (dispatch) => {
//   dispatch({
//     type: CLEARPARTICULARUSER,
//   });
// };
// // ClearProfiles
// export const clearProflies = () => async (dispatch) => {
//   dispatch({
//     type: CLEAR_PROFILES,
//   });
// };

// or or or or or

// SetParticularUser
// This func is used when in search input multiple users appears and when one of them is clicked
// then his profile will be stored in particularuser
export const setParticularUser = (data) => {
  dispatch({
    type: SETPARTICULARUSER,
    payload: data,
  });
};

// ClearParticularUser
export const clearParticularUser = () => {
  dispatch({
    type: CLEARPARTICULARUSER,
  });
};
// ClearProfiles
export const clearProflies = () => {
  dispatch({
    type: CLEAR_PROFILES,
  });
};