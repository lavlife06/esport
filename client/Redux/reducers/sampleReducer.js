import { SAMPLE_DATA_FETCH } from '../actions/types';

const initialState = { name: '', age: null };

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SAMPLE_DATA_FETCH:
      return {
        ...state,
        // ...payload,
        name: payload[0].name,
        age: payload[0].age,
      };
    default:
      return state;
  }
}
