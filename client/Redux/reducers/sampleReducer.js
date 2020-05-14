import { SAMPLE_DATA_FETCH } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SAMPLE_DATA_FETCH:
      return payload;
    default:
      return state;
  }
}
