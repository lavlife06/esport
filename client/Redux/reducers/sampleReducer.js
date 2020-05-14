import { SAMPLE_DATA_FETCH } from "../actions/types";

const initialState = []

export default function(state = [], action){
  const {type, payload} = action
  console.log(payload)
  switch(type){
    case SAMPLE_DATA_FETCH:
      return payload
    default: 
      return state
  }
}
