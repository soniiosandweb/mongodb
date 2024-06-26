import { 
    GET_TODO_LIMIT,
    GET_ALL_TODO,
    Add_TODO,
    GET_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    DELETE_ALL_TODOS
 } from './types';

import TodoDataService from '../services/todo.service';

export const getAllTodoLimitData = (limit) => async (dispatch) =>{
    try{
       const res = await TodoDataService.getTodoLimit(limit);
       dispatch({
        type : GET_TODO_LIMIT,
        payload : res.data
       })
    } catch (error) {
        console.log(error);
    }
}

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

export const deleteAllTodosData = () => async (dispatch) => {
    try {
        const res = await TodoDataService.deleteAllTodo();
        dispatch({
            type : DELETE_ALL_TODOS,
            payload: res.data
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const filterTodoByTitle = (title) => async (dispatch) => {
    try{
        const res = await TodoDataService.findByTodoTitle(title);
        dispatch({
            type : GET_ALL_TODO,
            payload : res.data
        })
    }
    catch(err){
        console.log(err)
    }
}

export const filterPublishedTodo = (value) => async (dispatch) => {
    try {
        const res = await TodoDataService.filterPublished(value);
        dispatch({
            type : GET_ALL_TODO,
            payload : res.data
        })
    }
    catch(err){
        console.log(err)
    }
}