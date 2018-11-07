// @ts-ignore
import { applyMiddleware, createStore } from 'redux';
// @ts-ignore
import { createLogger } from 'redux-logger';
// @ts-ignore
import thunk from 'redux-thunk';
import reducer from './reducers';

const logger = createLogger({});
const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, middleware);