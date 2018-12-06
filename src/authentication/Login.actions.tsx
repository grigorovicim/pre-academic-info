// @ts-ignore
import axios from 'axios';

export default class LoginActions {
  static setCookie(tokenName: any, sessionID: any) {
    // const d = new Date();
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // const expires = "expires="+ d.toUTCString();
    // document.cookie = "{" + '"' + cname + '"' + ":" + JSON.stringify(cvalue) + "};" + expires + ";path=/";
    // console.log(document.cookie);
    localStorage.setItem(tokenName, sessionID);
  }
  
  static eraseCookie(name: any) {   
    // document.cookie = "";  
    localStorage.removeItem(name);
    localStorage.clear();
  }

  static authenticate = (email: any, password: any) => (dispatch: any, /*getState: any*/) => {
    axios.post('/login', {email: email, password: password})
      .then((response) => {
        if (response.data !== null) {
          LoginActions.setCookie('token', response.data.session);
          if(response.data.type === 'professor') {
            dispatch({
              type: 'SET_USER_DETAILS',
              payload: {
                user: {
                  userDetails: response.data,
                  isProfessor: true,
                }
              },
            });
          } else {
            dispatch({
              type: 'SET_USER_DETAILS',
              payload: {
                user: {
                  userDetails: response.data,
                  isProfessor: false,
                }
              },
            });
          }
        }
      })
      .catch((error) => {
        throw error;
      })
      .then(() => {
      });
  };

  static logout = (user: any) => (dispatch: any, /*getState: any*/) => {
    axios.post('/logout', {user: user})
      .then((response) => {
        LoginActions.eraseCookie('token');
        dispatch({
            type: 'SWITCH_PAGE_TO_LOGIN',
            payload: {
              user: {
                isLoggedIn: false,
                isProfessor: false,
                userDetails: null,
              }
            },
        });
      })
    }
  }
