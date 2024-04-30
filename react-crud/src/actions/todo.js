import { 
    GET_ALL_TODO,
    Add_TODO
 } from './types';

import TodoDataService from '../services/todo.service';

export const getAllTodoList = () => async (dispatch) => {
    try {

        const res = await TodoDataService.getAllTodo();
        dispatch({
            type : GET_ALL_TODO,
            payload : res.data
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const addTodoItemData = (data) => async (dispatch) => {
    try {
        const res = await TodoDataService.addTodoItem(data);
        dispatch({
            type : Add_TODO,
            payload: res.data
        })

        return Promise.resolve(res.data);
    }
    catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}