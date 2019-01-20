import { FETCH_ACTIVITIES } from '../actions/types';

const initialState = {
    items: [] as any,
    group: "17",
    classType: "Courses",
    week: "1",
    studentSubstring: "",
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return {
                ...state,
                items: action.payload.items,
            };

        default:
            return state;
    }
};
