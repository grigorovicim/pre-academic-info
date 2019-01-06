
const reducer = (state = {
  isPopupVisible: false,
  popupContent: null,
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
        isLoggedIn: true,
        isChecked: true,
      }),
    };
  }
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

  case 'SET_POPUP_CONTENT': {
    return {
      ...state,
      popupContent: payload.popupContent,
    };
  }
  default:
    return state;
  }
};

export default reducer;