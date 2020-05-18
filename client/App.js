import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { store } from './Redux/store';
import MainComponent from './MainComponent';

import setAuthToken from './Redux/setAuthToken';

const App = () => {
  // useEffect(() => {
  //   // console.log(AsyncStorage.token);
  //   // if (AsyncStorage.token) {
  //   //   setAuthToken(AsyncStorage.token);
  //   //   console.log(AsyncStorage.token);
  //   // }
  //   console.log(' App refreshed');
  // }, [setAuthToken]);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
