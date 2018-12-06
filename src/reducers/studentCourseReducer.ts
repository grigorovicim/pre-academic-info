import { FETCH_STUDENT_COURSES, NEW_STUDENT_COURSE } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_STUDENT_COURSES:
        return {
          items: action.payload
        };

        case NEW_STUDENT_COURSE:
        return {
          items: action.payload
        };
      
      default:
        return state;
    }
  }