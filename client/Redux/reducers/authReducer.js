import {FETCH_USER } from "../actions/types";

export default function(state = [], action){
  const {type, payload} = action
  console.log(payload)
  switch(type){
    case FETCH_USER:
      return payload
    default: 
      return state
  }
}