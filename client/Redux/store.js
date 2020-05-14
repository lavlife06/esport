import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);
// import { applyMiddleware, createStore } from 'redux';
// import reducers from './reducers';

// const initialState = {};

// export const store = createStore(
//   reducers,
//   initialState,
//   applyMiddleware(reduxThunk)
// );
