import { 
    GET_TODO_LIMIT,
    GET_ALL_TODO,
    Add_TODO,
    GET_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    DELETE_ALL_TODOS
} from "../actions/types";

const initialState = {
    todosLimit : [],
    todosItem : [],
    todoItem : []
};

function todoReducer( state = initialState, action){

    const {type, payload} = action;

    switch (type) {
        case GET_TODO_LIMIT:
            return {
                ...state,
                todosLimit : payload
            }

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

        case DELETE_ALL_TODOS:
            return {
                todosItem: []
            }
            
        default:
            return state;
    }
}

export default todoReducer;