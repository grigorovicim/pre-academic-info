import { FETCH_ACTIVITIES } from '../actions/types';

const initialState = {
    items: [] as any,
    group: "17",
    classType: "Course",
    week: "1",
    studentSubstring: "",
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return {
                ...state,
                items: Array.from(action.payload.items),
            };
        case 'SAVE_GROUP':
            return {
                ...state,
                group: action.payload.group
            }
        case 'SAVE_CLASS':
            return {
                ...state,
                classType: action.payload.classType
            }
        case 'SAVE_WEEK':
            return {
                ...state,
                week: action.payload.week
            }
        case 'SAVE_STUDENT_SUBSTRING':
            return {
                ...state,
                studentSubstring: action.payload.str
            }

        default:
            return state;
    }
};
