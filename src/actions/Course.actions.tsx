import axios from 'axios';

import { FETCH_CATALOG, FILTER_CATALOG_STUDY, FILTER_CATALOG_SEMESTER, FILTER_CATALOG_YEAR} from './types';

export default class CourseActions {

    static saveStudyFilter = (study: string) => (dispatch: any) => {
        dispatch({
            type: FILTER_CATALOG_STUDY,
            payload: {
                study,
            },
        });
    };

    static saveSemesterFilter = (semester: string) => (dispatch: any) => {
        dispatch({
            type: FILTER_CATALOG_SEMESTER,
            payload: {
                semester,
            },
        });
    };

    static saveYearFilter = (year: string) => (dispatch: any) => {
        dispatch({
            type: FILTER_CATALOG_YEAR,
            payload: {
                year,
            },
        });
    };

    static fetchCatalog = (data: any) => (dispatch: any) => {
        const professorId = data.user.userDetails.id;
        const study = data.study;
        const year = data.year;
        const semester = data.semester;

        axios.post('/fetch-catalog', {
            professorId,
            study,
            year,
            semester,
        }).then((response) => {
            dispatch({
                type: FETCH_CATALOG,
                payload: {
                    items: response.data,
                },
            });
        });
    };


}