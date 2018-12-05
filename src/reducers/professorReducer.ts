import { FETCH_PROFESSORS } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROFESSORS:
        return {
          items: action.payload
        };
      
      default:
        return state;
    }
  }