import { SAMPLE_DATA_FETCH } from "../actions/types";

const initialState = {name: 'NO NAME', age: 'NO AGE'}

export default function(state = [], action){
  switch(action.type){
    case SAMPLE_DATA_FETCH:
      return action.payload
    default: 
      return state
  }
}