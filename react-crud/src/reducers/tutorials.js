import { 
    CREATE_TUTORIAL,
    RETRIEVE_TUTORIAL,
    GET_TUTORIAL,
    UPDATE_TUTORIAL,
    DELETE_TUTORIAL,
    DELETE_ALL_TUTORIALS
} from "../actions/types";

const initialState = {
    tutorialItems: [],
    tutorialItem: []
};

function tutorialReducer(state = initialState, action){
    const {type, payload} = action;

    switch (type){
        case CREATE_TUTORIAL:
            return {
                ...state,
                tutorialItems: [payload, ...state.tutorialItems]
            }

        case RETRIEVE_TUTORIAL:
            return {
                ...state,
                tutorialItems: payload
            }
        
        case GET_TUTORIAL:
            return {
                ...state,
                tutorialItem: payload
            }

        case UPDATE_TUTORIAL:
            return {
                ...state,
                tutorialItems: state.tutorialItems.map((post) =>
                    post.id === payload.id ? payload : post
                )
            }
        
        case DELETE_TUTORIAL:
            return{
                ...state,
                tutorialItems: state.tutorialItems.filter((tutorialItems) => tutorialItems.id !== payload.id)
            }

        case DELETE_ALL_TUTORIALS:
            return {
                tutorialItems: []
            }

        default:
            return state;
    }
}

export default tutorialReducer;