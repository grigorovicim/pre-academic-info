import {FETCH_COURSE_CONFIG} from '../actions/types';

const initialState = {
    courseConfig: {}
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    
        case FETCH_COURSE_CONFIG:
            return {
                ...state,
                courseConfig: action.payload
            };
        default:
            return state;
    }
}