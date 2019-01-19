import {FETCH_CATALOG, FILTER_CATALOG_STUDY, FILTER_CATALOG_YEAR, FILTER_CATALOG_SEMESTER} from '../actions/types';

const initialState = {
    items: [] as any,
    filteredItems: [],
    study: "1",
    year: "1",
    semester: "1",
    currentCourseId: null,
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_CATALOG:
            return {
                ...state,
                items: action.payload.items,
            };

        case FILTER_CATALOG_STUDY:
            return {
                ...state,
                study: action.payload.study,
                filteredItems: state.items.filter(item => item.academic_programme_id.toString() === action.payload.study &&  item.year_of_study.toString() ===  state.year && item.semester_id.toString() === state.semester)
            };

        case FILTER_CATALOG_YEAR: {
            return {
                ...state,
                year: action.payload.year,
                filteredItems: state.items.filter(item => item.academic_programme_id.toString() === state.study &&  item.year_of_study.toString() ===  action.payload.year && item.semester_id.toString() === state.semester)
            };
        }

        case FILTER_CATALOG_SEMESTER: {
            return {
                ...state,
                semester: action.payload.semester,
                filteredItems: state.items.filter(item => item.academic_programme_id.toString() === state.study &&  item.year_of_study.toString() ===  state.year && item.semester_id.toString() === action.payload.semester)
            };
        }
        case 'LOAD_COURSES': {
          return {
            ...state,
            items: Array.from(action.payload.dashboardItems),
            filteredItems: action.payload.dashboardItems.filter(item => item.academic_programme_id.toString() === state.study &&  item.year_of_study.toString() ===  state.year && item.semester_id.toString() === state.semester)
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
            filteredItems: action.payload.dashboardItems.filter(item => item.academic_programme_id.toString() === state.study &&  item.year_of_study.toString() ===  state.year && item.semester_id.toString() === state.semester)
          };
        }

        default:
            return state;
    }
};
