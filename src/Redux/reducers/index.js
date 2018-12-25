// src/reducers/index.js

import { combineReducers } from 'redux';
import homeReducer from './homeReducer';

const allReducers = {
    homeState: homeReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;