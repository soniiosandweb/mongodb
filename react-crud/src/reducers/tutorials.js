import { CREATE_TUTORIAL } from "../actions/types";

const initialState = [];

function tutorialReducer(tutorials = initialState, action){
    const {type, payload} = action;

    switch (type){
        case CREATE_TUTORIAL:
            return [...tutorials, payload];

        default:
            return tutorials;
    }
}

export default tutorialReducer;