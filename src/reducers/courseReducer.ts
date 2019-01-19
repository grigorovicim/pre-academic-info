import {FETCH_CATALOG, FILTER_CATALOG_STUDY, FILTER_CATALOG_YEAR, FILTER_CATALOG_SEMESTER} from '../actions/types';

const initialState = {
    items: [],
    study: "LICENTA",
    year: "I",
    semester: "1",
    currentCourseId: null,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_CATALOG:
            return {
                ...state,
                items: action.payload.items
            };

        case FETCH_CATALOG:
            return {
                ...state,
                items: action.payload.items
            };

        case FILTER_CATALOG_STUDY:
            return {
                ...state,
                study: action.payload.study
            };

        case FILTER_CATALOG_YEAR: {
            return {
                ...state,
                year: action.payload.year
            };
        }

        case FILTER_CATALOG_SEMESTER: {
            return {
                ...state,
                semester: action.payload.semester
            };
        }
        case 'LOAD_COURSES': {
          return {
            ...state,
            items: Array.from(action.payload.dashboardItems),
          };
        }
        case 'SET_CURRENT_COURSE_ID': {
          return {
            ...state,
            currentCourseId: action.payload.currentCourseId,
          };
        }

        case 'LOAD_COURSE': {
          return {
            ...state,
            items: Array.from(action.payload.dashboardItems),
            isPopupVisible: action.payload.isCampaignPopupVisible,
          };
        }

        default:
            return state;
    }
};
