import { GET_ALL_TODO } from "../actions/types";

const initialState = {
    todosItem : []
};

function todoReducer( state = initialState, action){

    const {type, payload} = action;

    switch (type) {
        case GET_ALL_TODO:
            return {
                ...state,
                todosItem : payload
            }
            
        default:
            return state;
    }
}

export default todoReducer;