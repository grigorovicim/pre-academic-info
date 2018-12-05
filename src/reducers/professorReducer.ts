import { FETCH_PROFESSORS, FETCH_PROFESSOR_PROFILE, REMOVE_PROFFESOR_COURSE_CONFIG } from '../actions/types';

const initialState = {
  items: [] as any,
  professorProfile: {}
}

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
        };
      case REMOVE_PROFFESOR_COURSE_CONFIG:
        return {
          ..state,
          items: state.items.filter(item => item.id !== +action.payload.professor_id)
        };
      default:
        return state;
    }
  }