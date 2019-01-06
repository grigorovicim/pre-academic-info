const reducer = (state = {
  items: null,
  currentCourseId: null,
}, action: any) => {

  const {
    type,
    payload,
  } = action;

  switch (type) {
  case 'LOAD_COURSES': {
    return {
      ...state,
      items: Array.from(payload.dashboardItems),
    };
  }
  case 'SET_CURRENT_COURSE_ID': {
    return {
      ...state,
      currentCourseId: payload.currentCourseId,
    };
  }

  case 'LOAD_COURSE': {
    return {
      ...state,
      items: Array.from(payload.dashboardItems),
      isPopupVisible: payload.isCampaignPopupVisible,
    };
  }
  
  default:
    return state;
  }
};

export default reducer;