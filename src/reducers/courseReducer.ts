
import { FETCH_COURSES } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_COURSES:
        return {
          items: action.payload
        };
      
      default:
        return state;
    }
  }
