import {FETCH_CATALOG, FILTER_CATALOG_STUDY, FILTER_CATALOG_YEAR, FILTER_CATALOG_SEMESTER} from '../actions/types';

const initialState = {
    items: [
        {id: 1, name: "LFTC", department: "info", isConfigured: false, academic_programme_id: 1,  year_of_study: 1, semester_id: 1 },
        {id: 2, name: "PPD", department: "info", isConfigured: false, academic_programme_id: 2, year_of_study: 1, semester_id: 1},
        {id: 3, name: "PLF", department: "info", isConfigured: true, academic_programme_id: 2, year_of_study: 2, semester_id: 2},
        {id: 4, name: "Microcontrollers", department: "info", isConfigured: false, academic_programme_id: 2, year_of_study: 2, semester_id: 1},
        {id: 5, name: "ASC", department: "info", isConfigured: true, academic_programme_id: 1, year_of_study: 3, semester_id: 1},
        {id: 6, name: "MAPP", department: "info", isConfigured: true, academic_programme_id: 1, year_of_study: 3, semester_id: 2},
    ],
    filteredItems: [],
    study: "LICENTA",
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
          };
        }

        default:
            return state;
    }
};
