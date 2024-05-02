import { 
    GET_ALL_TODO,
    Add_TODO,
    GET_TODO,
    UPDATE_TODO,
    DELETE_TODO
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

        case UPDATE_TODO:
            return {
                ...state,
                todosItem: state.todosItem.map((todo) =>
                    todo.id === payload.id ? payload : todo
                )
            }

        case DELETE_TODO:
            return{
                ...state,
                todosItem: state.todosItem.filter((todosItem) => todosItem.id !== payload.id)
            }
            
        default:
            return state;
    }
}

export default todoReducer;