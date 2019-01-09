import { FETCH_PROFILES } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROFILES:
        return {
          items: action.payload
        };
        
      default:
        return state;
    }
  }
