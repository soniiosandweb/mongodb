import { 
    GET_ALL_TODO,
    Add_TODO,
    GET_TODO,
    UPDATE_TODO,
    DELETE_TODO
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

export const getTodo = (id) => async (dispatch) => {
    try{

        const res = await TodoDataService.getOne(id);
        dispatch({
            type : GET_TODO,
            payload: res.data
        })
    }
    catch(err){
        console.log(err);
    }
}

export const updateTodoData = (id, data) => async (dispatch) => {
    try {
        const res = await TodoDataService.updateTodo(id,data);
        dispatch({
            type : UPDATE_TODO,
            payload : res.data
        })

        return Promise.resolve(res.data);

    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export const deleteTodoItem = (id) => async (dispatch) => {

    try {
        const res = await TodoDataService.deleteTodo(id);
        dispatch({
            type : DELETE_TODO,
            payload : res.data
        })
    } catch (error) {
        console.log(error)
    }
    
}