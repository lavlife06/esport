import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, getCachedAuthAsync, signOutAsync } from '../../Redux/actions/googleAuth';
import {Text, Button } from 'react-native-elements';



export default function GoogleSignin() {
  const authState = useSelector(state => state.googleAuth);
  //authState is array of [authState, response.data] from action googleAuth
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (dispatch(getCachedAuthAsync()) && !authState) {
        dispatch(getCachedAuthAsync())
      }
    })();
  }, []);

  return (
      <View style={styles.container}>
        {!authState && 
          <Button 
            title='SignIn With Google'
            style={{ width: 192, height: 48 }}
            onPress={async () => {
              dispatch(signInAsync());
            }}
           />
        }
        {!authState ? null : 
          <View>
            <Text>{authState[1].name} {authState[1].email}</Text>
            <Button
              title='Sign Out'
              onPress={async () => {
                dispatch(signOutAsync(authState[0]))
              }}
            />
          </View>
        }
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
});