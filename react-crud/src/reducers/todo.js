import { 
    GET_ALL_TODO,
    Add_TODO
 } from "../actions/types";

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

        case Add_TODO:
            return {
                ...state,
                todosItem: [payload, ...state.todosItem]
            }
            
        default:
            return state;
    }
}

export default todoReducer;