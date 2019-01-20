import {combineReducers} from 'redux';

import app from './app';
import studentReducer from './studentReducer';
import professorReducer from './professorReducer';
import courseReducer from './courseReducer';
import formOfEvaluationReducer from './formOfEvaluationReducer';
import studentcourseReducer from "./studentcourseReducer";
import courseConfigReducer from './courseConfigReducer';
import catalogReducer from './catalogReducer';

import professorcourseReducer from "./professorcourseReducer";

export default combineReducers({
    app,
    studentReducer,
    professorReducer,
    courseReducer,
    studentcourseReducer,
    professorcourseReducer,
    formOfEvaluationReducer,
    courseConfigReducer,
    catalogReducer,
});