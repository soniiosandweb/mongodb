import { combineReducers } from 'redux';
import tutorialReducer from './tutorials';
import todoReducer from './todo';

export default combineReducers({
    tutorials: tutorialReducer,
    todos : todoReducer
})