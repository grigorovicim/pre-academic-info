import { FETCH_STUDENTS, NEW_STUDENT } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  console.log("in student reducer");
  
    switch (action.type) {
      case FETCH_STUDENTS:
        console.log("case fetch_students");
      
        return {
          items: action.payload
        };
        
      case NEW_STUDENT:
        return {
          items: action.payload
        };
        
      default:
        return state;
    }
  }
