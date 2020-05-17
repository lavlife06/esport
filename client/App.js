import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import MainComponent from './MainComponent';
import { AsyncStorage } from 'react-native';
import setAuthToken from './Redux/setAuthToken';

const App = () => {
  // useEffect(() => {
  //   setAuthToken(AsyncStorage.token);
  //   console.log(' App refreshed');
  // }, [setAuthToken]);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
