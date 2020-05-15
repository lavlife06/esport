import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import MainComponent from './MainComponent';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};
export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App/>
  </ApplicationProvider>
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
