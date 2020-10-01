import { combineReducers } from 'redux';
import authStore from './auth.reducer';
import errorStore from './error.reducer';
import todoStore from './todo.reducer';

const reducers = {
    auth: authStore,
    error: errorStore,
    todo: todoStore
}

const rootReducer = combineReducers(reducers);

export default rootReducer;