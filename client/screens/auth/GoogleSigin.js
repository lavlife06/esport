import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, getCachedAuthAsync, signOutAsync } from '../../Redux/actions/googleAuth';
import {Text, Button,SocialIcon } from 'react-native-elements';



export default function GoogleSignin({title, navigation}) {
  const auth = useSelector(state => state.googleAuth);
  const isAuthenticated = auth.isAuthenticated;
  //authState is array of [authState, response.data] from action googleAuth
  const dispatch = useDispatch();

  return (
      <View>
        <SocialIcon
          title={title}
          button
          style={{margin: 40}}
          type='google'
          onPress={async () => {
            dispatch(signInAsync());
            navigation.navigate('Home');
          }}
        />
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
});