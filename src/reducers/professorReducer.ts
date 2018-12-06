import { FETCH_PROFESSORS, FETCH_PROFESSOR_PROFILE } from '../actions/types';

const initialState = {
  items: [],
  professorProfile: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROFESSORS:
        return {
          ...state,
          items: action.payload
        };
        case FETCH_PROFESSOR_PROFILE:
        return{
          ...state,
          professorProfile: action.payload
        }

      
      default:
        return state;
    }
  }