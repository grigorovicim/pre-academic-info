// @ts-ignore
import axios from 'axios';

export default class CourseActions {
    static createCourseDetails = (item: any, sessionId: any) => (dispatch: any) => {
        dispatch({
            type: 'SET_POPUP_VISIBILITY',
            payload: {
                isCourseDetailsPopupVisible: false,
            },
        });

        axios.post('/create-course-details', {item: item, sessionId: sessionId})
            .then((response) => {
                dispatch({
                    type: 'LOAD_COURSE_DETAILS',
                    payload: {}
                })
            })
            .catch((error) => {
                throw error;
            })
            .then(() => {

            });
    }
}