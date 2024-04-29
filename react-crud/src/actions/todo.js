import { GET_ALL_TODO } from './types';

import TodoDataService from '../services/todo.service';

export const getAllTodoList = () => async (dispatch) => {
    try {

        const res = await TodoDataService.getAllTodo();
        dispatch({
            type : GET_ALL_TODO,
            payload : res.data
        })
        
    } catch (error) {
        console.log(error)
    }
}