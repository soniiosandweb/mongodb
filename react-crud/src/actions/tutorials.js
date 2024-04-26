import { 
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIAL,
    GET_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS
} from "./types";

import TutorialDataService from '../services/tutorial.service';

export const createTutorial = (data) => async (dispatch) =>{
    try{
        const res = await TutorialDataService.create(data);
        dispatch({
            type: CREATE_TUTORIAL,
            payload: res.data
        });
        return Promise.resolve(res.data);
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const retrieveTutorial = () => async (dispatch) =>{
    try{
        const res = await TutorialDataService.getAll();
        dispatch({
            type: RETRIEVE_TUTORIAL,
            payload: res.data
        })
    }
    catch(err){
        console.log(err);
    }
}

export const getTutorial = (id) => async (dispatch) => {
    try{

        const res = await TutorialDataService.getOne(id);
        dispatch({
            type : GET_TUTORIAL,
            payload: res.data
        })
    }
    catch(err){
        console.log(err);
    }
}

export const updateTutorial = (id, data) => async (dispatch) => {
    try{
        await TutorialDataService.update(id, data);
        // console.log(res.data)
        dispatch({
            type : UPDATE_TUTORIAL,
            payload : data
        })
        
       return Promise.resolve(data);
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const deleteTutorial = (id) => async (dispatch) => {
    try{
        await TutorialDataService.delete(id);
        dispatch({
            type : DELETE_TUTORIAL,
            payload: id
        })
    }
    catch(err){
        console.log(err);
    }
}

export const deleteAllTutorials = () => async (dispatch) => {
    try{
        const res = await TutorialDataService.deleteAll();
        dispatch({
            type : DELETE_ALL_TUTORIALS,
            payload : res.data
        })
    }
    catch(err){
        console.log(err);
    }
}

export const filterTutorialByTitle = (title) => async (dispatch) => {
    try{
        const res = await TutorialDataService.findByTitle(title);
        dispatch({
            type : RETRIEVE_TUTORIAL,
            payload : res.data
        })
    }
    catch(err){
        console.log(err)
    }
}

export const filterPublishedTutorial = (value) => async (dispatch) => {
    try {
        const res = await TutorialDataService.filterPublished(value);
        dispatch({
            type : RETRIEVE_TUTORIAL,
            payload : res.data
        })
    }
    catch(err){
        console.log(err)
    }
}