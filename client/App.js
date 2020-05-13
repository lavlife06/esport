import React from 'react';
import { Provider} from 'react-redux';
import { store } from './Redux/store';
import MainComponent from './MainComponent';

export default function App() {
  return (
    <Provider store={store}>
      <MainComponent/>
    </Provider>
  );
}

