import reduxThunk from 'redux-thunk';
<<<<<<< HEAD
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

export const store = createStore(
  reducers, 
  {}, 
  composeWithDevTools(applyMiddleware(reduxThunk)));
=======
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxThunk)
);
>>>>>>> a2533f9339bd23b17dc4cdd4ff7b8a60a1f9794b
