import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  justifyContent: 'center',
});

export default Loading;
