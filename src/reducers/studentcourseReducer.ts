import {FETCH_STUDENTS_ENROLLED, FETCH_STUDENTS_NOT_ENROLLED} from '../actions/types';

const initialState = {
    enrolled: [] as any,
    notEnrolled: [] as any
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUDENTS_ENROLLED:
            return {
                ...state,
                enrolled: action.payload
            };
        case FETCH_STUDENTS_NOT_ENROLLED:
            return{
                ...state,
                notEnrolled: action.payload
            };
        default:
            return state;
    }
}
