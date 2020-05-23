import {
  FETCHEVENTS_SUCCESS,
  FETCHEVENTS_FAIL,
  ADDEVENT_SUCCESS,
  ADDEVENT_FAIL,
} from '../actions/types';

// I have kept this initial state an object so when in future we want to add more stuff we can easily do in object
const initialState = {
  allevents: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCHEVENTS_SUCCESS:
      return {
        // ...state,
        allevents: [...payload],
        loading: false,
      };
    case ADDEVENT_SUCCESS:
      // We don't have to deal with data because its automatically saving data in profile
      return {
        loading: false,
      };
    default:
      return state;
  }
};
