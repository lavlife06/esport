import reduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxThunk)
);
