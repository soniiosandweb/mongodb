import { combineReducers } from 'redux';
import tutorialReducer from './tutorials';

export default combineReducers({
    tutorials: tutorialReducer,
})