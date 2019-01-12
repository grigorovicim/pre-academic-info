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
                    isLoggedIn: true,
                    isChecked: true,
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
                    isLoggedIn: true,
                    isChecked: true,
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
                  isChecked:false,
                  isProfessor: false,
                  userDetails: null,
              }
            },
        });
      })
    };

  static register = (firstName: any, lastName: any, email: any) => (dispatch: any) => {
      axios.put('/register', {firstName: firstName, lastName: lastName, email: email})
          .then(() =>{
          })
          .catch((error) => {
          throw error;
          })
          .then(() => {
          });
  };
}
