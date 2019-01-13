import {FETCH_STUDENTS, FETCH_STUDENT_PROFILE, REMOVE_STUDENT_COURSE_CONFIG} from '../actions/types';

const initialState = {
    items: [] as any,
    studentProfile: {}
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {
                ...state,
                items: action.payload
            };
        case FETCH_STUDENT_PROFILE:
            return {
                ...state,
                studentProfile: action.payload
            };
        case REMOVE_STUDENT_COURSE_CONFIG:
            return {
                ...state,
                items: state.items.filter((item: any) => item.id !== +action.payload.student_id)
            };
        default:
            return state;
    }
}
