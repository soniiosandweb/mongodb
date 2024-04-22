import { CREATE_TUTORIAL } from "./types";

import TutorialDataService from '../services/tutorial.service';

export const createTutorial = (title, description) => async (dispatch) =>{
    try{
        const res = await TutorialDataService.create({title, description});
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