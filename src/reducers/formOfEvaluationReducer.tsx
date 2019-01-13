import {CREATE_FORM_OF_EVALUATION} from "../actions/types";
import {FETCH_FORM_OF_EVALUATION} from "../actions/types";

const initialState = {
    items: [] as any,
    formOfEval: {},
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case CREATE_FORM_OF_EVALUATION:
            return {
                ...state,
                formOfEval: action.payload
            };
        case FETCH_FORM_OF_EVALUATION:
            return {
                ...state,
                formOfEval: action.payload
            };
        default:
            return state;
    }
}