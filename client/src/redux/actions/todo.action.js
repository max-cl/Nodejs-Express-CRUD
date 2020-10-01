import axios from 'axios';

// Action
import { returnErrors } from './error.action';

// Actions Types
import { 
    GET_TODO_REQUEST, GET_TODO_SUCCESS, GET_TODO_FAILURE,
    REMOVE_TODO_REQUEST, REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
    UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE,
    CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE
} from '../action_types';

// APIs
import { GET_TODOS, REMOVE_TODO, UPDATE_TODO, CREATE_TODO } from '../apis';

// Helper
import { tokenConfig } from './actions.helper';

// Get all TODOs
export const getTodos = (id_user) => {
    return async (dispatch, getState) => {
        dispatch({ type: GET_TODO_REQUEST });
        try {

                const todos = await axios.get(`${GET_TODOS}/${id_user}`, tokenConfig(getState));
                dispatch({ type: GET_TODO_SUCCESS, payload: todos.data.data }); 

        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, GET_TODO_FAILURE));
        }
    }
};

// Remove TODO
export const removeTodo = (id_user, id) => {
    return async (dispatch, getState) => {
        dispatch({ type: REMOVE_TODO_REQUEST });
        try {

            const todo = await axios.delete(`${REMOVE_TODO}/${id_user}/${id}`, tokenConfig(getState));
            
            console.log(todo.data);
            dispatch({ type: REMOVE_TODO_SUCCESS, payload: id }); 

        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, REMOVE_TODO_FAILURE));
        }
    }
};


// Update TODO
export const updateTodo = (id_user, id, title, done) => {
    return async (dispatch, getState) => {
        dispatch({ type: UPDATE_TODO_REQUEST });
        try {

            const todo = await axios.put(`${UPDATE_TODO}`, {
                id_user,
                id,
                title,
                done
            }, tokenConfig(getState));

            console.log(todo.data);
            dispatch({ type: UPDATE_TODO_SUCCESS, payload: { id, title, done } }); 

        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, UPDATE_TODO_FAILURE));
        }
    }
};


// Add TODO
export const createTodo = (id_user, title) => {
    return async (dispatch, getState) => {
        dispatch({ type: CREATE_TODO_REQUEST });
        try {

            const newTodo = await axios.post(`${CREATE_TODO}`, {
                id_user,
                title,
            }, tokenConfig(getState));

            dispatch({ type: CREATE_TODO_SUCCESS, payload: { id: newTodo.data.id, title: newTodo.data.title, done: newTodo.data.done } }); 

        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status, CREATE_TODO_FAILURE));
        }
    }
};