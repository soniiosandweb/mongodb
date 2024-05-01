import { 
    GET_ALL_TODO,
    Add_TODO,
    GET_TODO
 } from "../actions/types";

const initialState = {
    todosItem : [],
    todoItem : []
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
        
        case GET_TODO:
            return {
                ...state,
                todoItem: payload
            }
            
        default:
            return state;
    }
}

export default todoReducer;