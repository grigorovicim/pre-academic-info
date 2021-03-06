
// @ts-ignore
import axios from 'axios';

import {
    FETCH_CATALOG,
    FILTER_CATALOG_STUDY,
    FILTER_CATALOG_SEMESTER,
    FILTER_CATALOG_YEAR
} from './types';


export default class CourseActions {
  static fetchItems = (email: any) => (dispatch: any, /*getState: any*/) => {
    axios.post('/course/get-dashboard-courses', {profEmail: email})
      .then((response) => {
        dispatch({
          type: 'LOAD_COURSES',
          payload: {
            dashboardItems: response.data,
          },
        });
      })
      .catch((error) => {
        throw error;
      })
      .then(() => {
      });
  };

  static displayCourses = (courses: any) => (dispatch: any) => {
    dispatch({
      type: 'LOAD_COURSES',
      payload: {
        dashboardItems: courses
      },
    });
  }
  
  static setPopupVisibility = (isCampaignPopupVisible: any) => (dispatch: any, /*getState: any*/) => {
    dispatch ({
      type: 'SET_POPUP_VISIBILITY',
      payload: {
        isCampaignPopupVisible,
      }
    });
  }
  static setIdOfCurrentCourse = (currentCourseId: any) => (dispatch: any, /*getState: any*/) => {
    dispatch ({
      type: 'SET_CURRENT_COURSE_ID',
      payload: {
        currentCourseId,
      }
    });
  }
  static updatePopupContentElement = (popupContent: any, isAlert: any) => (dispatch: any) => {
    dispatch({
      type: 'SET_POPUP_CONTENT',
      payload: {
        popupContent,
        isAlert
      },
    }); 
  }
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

export const getCourseDetails = (courseId: any) => (dispatch:any) => {
    axios.get('/course/:id' + courseId)
        .then(res =>res.data)
        .catch(error => {
                console.log(error)
            }
        );
};

    