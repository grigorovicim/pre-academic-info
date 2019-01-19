import {combineReducers} from 'redux';

import app from './app';
import studentReducer from './studentReducer';
import professorReducer from './professorReducer';
import courseReducer from './courseReducer';
import formOfEvaluationReducer from './formOfEvaluationReducer';
import courseConfigReducer from './courseConfigReducer';
import studentcourseReducer from "./studentcourseReducer";


export default combineReducers({
    app,
    studentReducer,
    professorReducer,
    courseReducer,
    studentcourseReducer,
    formOfEvaluationReducer,
    courseConfigReducer,
});