import { FETCH_STUDENTS } from '../actions/types';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  console.log("in student reducer");
  
    switch (action.type) {
      case FETCH_STUDENTS:
        console.log("case fetch_students");
      
        return {
          //...state,
          items: action.payload
        };
      
      default:
        return state;
    }
  }

// const studentReducer = (state: {professors: {};} = {
//     professors: {
    
//     }
// }, action: any) => {

//     const {
//       type,
//       payload,
//     } = action;
  
//     //dummy code; all the actions affecting users will need to be treated here
//     if (type === '' && payload === ''){
//         return {

//         };
//     }

//     return {
        
//     };
  
//   };
  
//   export default studentReducer;