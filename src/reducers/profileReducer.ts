import { FETCH_PROFILES, NEW_PROFILE } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROFILES:
        return {
          items: action.payload
        };
        case NEW_PROFILE:
        return {
          items: action.payload
        };
        
      default:
        return state;
    }
  }
