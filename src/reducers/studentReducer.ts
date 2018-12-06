import { FETCH_STUDENTS, FETCH_STUDENT_PROFILE } from '../actions/types';

const initialState = {
  items: [],
  studentProfile:{}
};

export default function(state = initialState, action) {
  //console.log("in student reducer");
  
    switch (action.type) {
      case FETCH_STUDENTS:
        //console.log("case fetch_students");
      
        return {
          ...state,
          items: action.payload
        };

        case FETCH_STUDENT_PROFILE:
        //console.log("case fetch_student_profile");
        return{
          ...state,
          studentProfile: action.payload
        }
      
      default:
        return state;
    }

  }
