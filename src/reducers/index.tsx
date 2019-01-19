import {combineReducers} from 'redux';

import app from './app';
import studentReducer from './studentReducer';
import professorReducer from './professorReducer';
import courseReducer from './courseReducer';
import formOfEvaluationReducer from './formOfEvaluationReducer';
import courseConfigReducer from './courseConfigReducer';


export default combineReducers({
    app,
    studentReducer,
    professorReducer,
    courseReducer,
    formOfEvaluationReducer,
    courseConfigReducer,
});