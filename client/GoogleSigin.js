import React, { useEffect, useState } from 'react';
import { Linking } from 'expo';
import { AsyncStorage, Button, StyleSheet, Text, View} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { NavigationContainer } from '@react-navigation/native';

const prefix = Linking.makeUrl('exp://192.168.43.100:19000 ')

export default function GoogleSignin() {
  let [authState, setAuthState] = useState(null);

  const linking = {
    prefixes: [prefix],
  }

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <Text>Expo AppAuth Example</Text>
        <Button
          title="Sign In with Google "
          onPress={async () => {
            const _authState = await signInAsync();
            setAuthState(_authState);
          }}
        />
        <Button
          title="Sign Out "
          onPress={async () => {
            await signOutAsync(authState);
            setAuthState(null);
          }}
        />
        {/* <Text>{authState.scopes}</Text> */}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let config = {
  issuer: 'https://accounts.google.com',
  scopes: ["profile", "email"],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId: '467702790820-h5khac5p024mdudn3956thvg0jns445i.apps.googleusercontent.com',
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}
