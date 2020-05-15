import {  GOOGLE_LOGIN, GOOGLE_LOGOUT, GET_CACHED_AUTH_ASYNC} from '../actions/types';

const initialState = {}


export default function(state = initialState, action){
  const {type, payload} = action
  switch(type){
    case GOOGLE_LOGIN:
      return payload
    case GOOGLE_LOGOUT:
      return payload
    case GET_CACHED_AUTH_ASYNC:
      return payload
    default: 
      return state
  }
}