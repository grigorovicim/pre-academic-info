import {combineReducers} from 'redux';

import app from './app';
import studentReducer from './studentReducer';
import professorReducer from './professorReducer';
import courseReducer from './courseReducer';
import formOfEvaluationReducer from './formOfEvaluationReducer';
import studentcourseReducer from "./studentcourseReducer";
import catalogReducer from './catalogReducer';


export default combineReducers({
    app,
    studentReducer,
    professorReducer,
    courseReducer,
    studentcourseReducer,
    formOfEvaluationReducer,
    catalogReducer,
});