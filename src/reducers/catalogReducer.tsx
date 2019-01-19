import {FETCH_ACTIVITIES} from '../actions/types';

const initialState = {
    items: [] as any,
    filteredItems: [],
    group: "1",
    class: "Courses",
    week: "1",
    studentSubstring: "",
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return {
                ...state,
                items: action.payload.items,
                filteredItems: action.payload.items
            };

        default:
            return state;
    }
};
