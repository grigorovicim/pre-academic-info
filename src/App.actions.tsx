// @ts-ignore
import axios from 'axios';
import CourseActions from './actions/Course.actions';

export default class AppActions {

  static checkAuthenticationToken = () => (dispatch: any) => {
    const sessionID = localStorage.getItem('token');
    if (sessionID !== null) {
      dispatch(AppActions.checkUser(sessionID));
    } else {
      dispatch(AppActions.switchPageToLogin());
    }
  };

  static switchPageToLogin = () => (dispatch: any) => {
    dispatch({
      type: 'SWITCH_PAGE_TO_LOGIN',
    })
  };

  static checkUser = (sessionID: string) => (dispatch: any) => {
    axios.post('/session-id', {sessionID: sessionID})
    .then((response:any) => {
      if (response.data.type === 'admin') {
        dispatch({
          type: 'SET_USER_DETAILS',
          payload: {
            user: {
              userDetails: response.data,
              isAdmin: true,
            },
          },
        });
        dispatch(CourseActions.fetchItems(response.data.username));
      } else {
        dispatch({
          type: 'SET_USER_DETAILS',
          payload: {
            user: {
              userDetails: response.data,
              isAdmin: false,
            },
          },
        });
        dispatch(CourseActions.fetchItems(response.data.username));
      }
    });
  };

  static setPopupContentElement = (popupContent: any) => (dispatch: any, /*getState: any*/) =>{
    dispatch ({
      type: 'SET_POPUP_CONTENT',
      payload: {
        popupContent,
      }
    });
  }
  static setIsAlert = (isAlert: any) => (dispatch: any, /*getState: any*/) =>{
    dispatch ({
      type: 'SET_IS_ALERT',
      payload: {
        isAlert,
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

  static setPopupVisibility = (isPopupVisible: any) => (dispatch: any, /*getState: any*/) => {
    dispatch ({
      type: 'SET_POPUP_VISIBILITY',
      payload: {
        isPopupVisible,
      }
    });
  }

}