import React, { useEffect, useState } from 'react';
import { Linking } from 'expo';
import { AsyncStorage, Button, StyleSheet, Text, View} from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, getCachedAuthAsync, signOutAsync } from './Redux/actions/googleAuth';

const prefix = Linking.makeUrl('exp://192.168.43.100:19000')

export default function GoogleSignin() {
  const authState = useSelector(state => state.googleAuth);
  //authState is array of [authState, response.data] from action googleAuth
  const dispatch = useDispatch();
  const linking = {
    prefixes: [prefix],
  }

  useEffect(() => {
    (async () => {
      if (dispatch(getCachedAuthAsync()) && !authState) {
        dispatch(getCachedAuthAsync())
      }
    })();
  }, []);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <View style={styles.container}>
        <Text>Expo AppAuth Example</Text>
        {!authState && 
          <Button
          title="Sign In with Google "
          onPress={async () => {
            dispatch(signInAsync());
          }}
        />
        }
        {!authState ? null : 
          <View>
            <Text>{authState[1].name} {authState[1].email}</Text>
            <Button
            title="Sign Out "
            onPress={async () => {
              dispatch(signOutAsync(authState[0]))
            }}
            />
          </View>
        }
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