

const reducer = (state = {
  isPopupVisible: false,
  popupContent: null,
  isAlert: false,
  user: {
    userDetails: null,
    isLoggedIn: false,
    isAdmin: false,
    isChecked: false,
  },
},
 action: any) => {

  const {
    type,
    payload,
  } = action;

  switch (type) {
  case 'SET_USER_DETAILS': {
    return {
      ...state,
      user: Object.assign({}, {
        ...state.user,
        userDetails: payload.user.userDetails,
        isAdmin: payload.user.isAdmin,
        isLoggedIn: payload.user.isLoggedIn,
        isChecked: payload.user.isChecked,
      }),
    };
  }
  case 'FETCH_COURSE_CONFIG':
      console.log(action.payload);
      return {
          ...state,
          courseConfig: action.payload
      };

  case 'SET_USER_TYPE_EMPLOYEE': {
    return {
      ...state,
      isLoggedIn: payload.isLoggedIn,
    };
  }

  case 'SET_USER_TYPE_ADMIN': {
    return {
      ...state,
      isAdmin: payload.isAdmin,
    };
  }
  case 'SWITCH_PAGE_TO_LOGIN': {
    return {
      ...state,
      user: Object.assign({}, {
        userDetails: null,
        isAdmin: false,
        isChecked: true,
        isLoggedIn: false,
      }),
    };
  }
  case 'SET_POPUP_VISIBILITY': {
    return {
      ...state,
      isPopupVisible: payload.isPopupVisible,
    };
  }
  case 'SET_IS_ALERT': {
    return {
      ...state,
      isAlert: payload.isAlert,
    };
  }

  case 'SET_POPUP_CONTENT': {
    return {
      ...state,
      popupContent: payload.popupContent,
    };
  }

  case 'FETCH_PROFILE': {
    return {
        ...state,
        profile: payload,
    }
  }
  case 'SET_PROFIL_PICTURE': {
    return {
      ...state,
      user: Object.assign({}, {
        ...state.user,
        userDetails: payload.user.userDetails,
        isAdmin: payload.user.isAdmin,
        isLoggedIn: payload.user.isLoggedIn,
        isChecked: payload.user.isChecked,
      }),
    };
  }

  default:
    return state;
  }
};

export default reducer;