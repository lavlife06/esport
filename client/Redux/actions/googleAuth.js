import { AsyncStorage} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { GOOGLE_LOGIN, GOOGLE_LOGOUT, GET_CACHED_AUTH_ASYNC } from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ["profile", "email"],
  clientId: '467702790820-h5khac5p024mdudn3956thvg0jns445i.apps.googleusercontent.com',
};

let StorageKey = '@MyApp:fskdajitreg4d5v46ecxcv';


export const signInAsync = () => async dispatch => {
  try{
    let authState = await AppAuth.authAsync(config);
    let res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authState.accessToken}`);
    await AsyncStorage.setItem(StorageKey, [JSON.stringify(authState), JSON.stringify(res.data)]);
    dispatch({type: GOOGLE_LOGIN, payload: [authState, res.data]})
    await axios.post(`http://${ipAddress}:3000/api/google/login_success`, res.data)
  }catch(e){
    console.log('error from action 1',e.response.data)
  }
}

export async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, [JSON.stringify(authState), JSON.stringify(res.data)]);
}

export const getCachedAuthAsync = () => async dispatch =>{
  let value = await AsyncStorage.getItem(StorageKey);
  console.log(value[0])
  let authState = await JSON.parse(value[0]);
  let res = await JSON.parse(value[1]);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      console.log('0cached',authState)
      dispatch({type: GET_CACHED_AUTH_ASYNC, payload: refreshAuthAsync(authState)})
    } else {
      // console.log('1cached',authState)
      dispatch({type: GET_CACHED_AUTH_ASYNC, payload: [authState, res.data]})
    }
  }
  dispatch({type: GET_CACHED_AUTH_ASYNC, payload: null})
}

export function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

export async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  await cacheAuthAsync(authState);
  let res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authState.accessToken}`);
  return [authState, res.data];
}

export const signOutAsync = ({accessToken}) => async (dispatch) => {
  try {
    console.log(accessToken)
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    console.log('SIGNING OUT')
    dispatch({type: GOOGLE_LOGOUT, payload: null})
  } catch (e) {
    console.log(`Failed to revoke token: ${e}`);
  }
}
