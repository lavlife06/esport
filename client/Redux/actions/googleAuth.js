import { AsyncStorage} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { GOOGLE_LOGIN, GOOGLE_LOGOUT, GET_CACHED_AUTH_ASYNC } from './types';

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ["profile", "email"],
  clientId: '467702790820-h5khac5p024mdudn3956thvg0jns445i.apps.googleusercontent.com',
};

let StorageKey = '@MyApp:fskdajitreg4d5v46ecxcv';

export const signInAsync = () => async dispatch => {
  let authState = await AppAuth.authAsync(config);
  await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  // console.log('signInAsync', authState);
  await
  dispatch({type: GOOGLE_LOGIN, payload: authState})
}


export async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export const getCachedAuthAsync = () => async dispatch =>{
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      dispatch({type: GET_CACHED_AUTH_ASYNC, payload: refreshAuthAsync(authState)})
    } else {
      dispatch({type: GET_CACHED_AUTH_ASYNC, payload: authState})
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
  return authState;
}

export const signOutAsync = ({accessToken}) => async (dispatch) => {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    console.log('SIGNING OUT')
    dispatch({type: GOOGLE_LOGOUT, payload: null})
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}
