import {
    GET_TODO_REQUEST, GET_TODO_SUCCESS,
    REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS,
    UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS,
    CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS
} from '../action_types';


const initialState = {
    todos : [],
    loading: false,
    loaded: false,
    error: null
}

export default (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
    
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case REMOVE_TODO_REQUEST:
    case GET_TODO_REQUEST:
        return {
            ...state,
            loading: true,
            loaded: false
        }

    case GET_TODO_SUCCESS:
        return {
            ...state,
            todos: payload,
            loading: false,
            loaded: true,
            error: null
        }

    case REMOVE_TODO_SUCCESS:
        return {
            ...state,
            todos: state.todos.filter(f => f.id !== payload),
            loading: false,
            loaded: true,
            error: null
        }
    
    case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todos: [ 
                    ...state.todos, {  
                        ...state.todos[payload.id],
                        title: payload.title,
                        done: payload.done
                    }
                ],
                loading: false,
                loaded: true,
                error: null
            }

    case CREATE_TODO_SUCCESS:
        return {
            ...state,
            todos: [...state.todos, payload],
            loading: false,
            loaded: true,
            error: null
        }
    
        default:
            return state
    }
}