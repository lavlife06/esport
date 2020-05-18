import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { store } from './Redux/store';
import MainComponent from './MainComponent';
import setAuthToken from './Redux/setAuthToken';

const App = () => {
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token')
      setAuthToken(token);
      console.log(' App refreshed');
    }
  }, [setAuthToken]);

  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
