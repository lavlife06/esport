import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useSelector, useDispatch } from 'react-redux';
import { sampleDataFetch } from './Redux/actions/sample';

const MainComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.sample) //mapStateToProps replacement

  useEffect(() => {
    dispatch(sampleDataFetch())
  }, [])

  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
    </View>
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

export default MainComponent;