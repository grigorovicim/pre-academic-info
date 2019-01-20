const initialState = {
    enrolled: [] as any,
    notEnrolled: [] as any
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PROFESSORS_ENROLLED':
            return {
                ...state,
                enrolled: action.payload
            };
        case 'FETCH_PROFESSORS_NOT_ENROLLED':
            return{
                ...state,
                notEnrolled: action.payload
            };
        default:
            return state;
    }
}