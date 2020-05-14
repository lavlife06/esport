import { SAMPLE_DATA_FETCH } from '../actions/types';

const initialState = []

export default function(state = [], action){
  const {type, payload} = action
  switch(type){
    case SAMPLE_DATA_FETCH:
      return payload
    default: 
      return state
  }
}
