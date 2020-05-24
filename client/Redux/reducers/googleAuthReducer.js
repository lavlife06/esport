import {  GOOGLE_LOGIN, GOOGLE_LOGOUT, GET_CACHED_AUTH_ASYNC} from '../actions/types';
import { AsyncStorage } from 'react-native';

const initialState = {
  token: AsyncStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};


export default function(state = initialState, action){
  const {type, payload} = action
  switch(type){
    case GOOGLE_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    default: 
      return state
  }
}