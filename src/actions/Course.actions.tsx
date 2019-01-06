// @ts-ignore
import axios from 'axios';

export default class CourseActions {
  static fetchItems = (session: any) => (dispatch: any, /*getState: any*/) => {
    axios.post('/get-dashboard-courses', {sessionId: session})
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

}