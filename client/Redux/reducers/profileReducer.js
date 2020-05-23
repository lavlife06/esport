import {
  GET_PROFILES,
  GET_MYPROFILE,
  PROFILE_ERROR,
  CLEAR_MYPROFILE,
  CLEAR_PROFILES,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  MYPROFILE_ERROR,
  SETPARTICULARUSER,
  CLEARPARTICULARUSER,
  PARTICULARUSER_ERROR,
  GETPARTICULARUSER,
  ADDEVENT_SUCCESS,
  // FETCHEVENTS_SUCCESS
} from '../actions/types';

const initialState = {
  myprofile: {},
  particularuser: {},
  profiles: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MYPROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        myprofile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case ADDEVENT_SUCCESS:
      return {
        myevents: [...state.myevents, ...payload],
      };
    case SETPARTICULARUSER:
    case GETPARTICULARUSER:
      return {
        ...state,
        particularuser: payload,
        loading: false,
      };
    case CLEARPARTICULARUSER:
      return {
        ...state,
        particularuser: null,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    // case PROFILES_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false,
    //     profiles: [],
    //   };
    case MYPROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        myprofile: {},
      };
    case CLEAR_MYPROFILE:
      return {
        ...state,
        myprofile: {},
        loading: false,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
};
