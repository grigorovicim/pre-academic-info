import { FETCH_USERS, NEW_USER } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS:
        return {
          items: action.payload
        };
        
      case NEW_USER:
        return {
          items: action.payload
        };
        
      default:
        return state;
    }
  }
