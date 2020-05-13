import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import MainComponent from './MainComponent';

const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
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

export default App;
