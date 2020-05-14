import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { sampleDataFetch } from './Redux/actions/sample';

const MainComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.sample); //mapStateToProps replacement
  const name = user.map((item) => {
    return item.name;
  });

  useEffect(() => {
    dispatch(sampleDataFetch());
  }, []);
  return (
    <View style={styles.container}>
      <Text>{name[0]}</Text>
      <Text>{name[1]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainComponent;
