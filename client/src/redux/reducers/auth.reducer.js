import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOGOUT_SUCCESS
} from '../action_types';
  
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: {},
    message: null
};
  
export default (state = initialState, action) => {
    switch (action.type) {

        case LOAD_USER_REQUEST:
            return {
            ...state,
            loading: true
        };
        case LOAD_USER_SUCCESS:
            return {
            ...state,
            isLoading: false,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user
        };

        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                loaded: true
            };
        case LOAD_USER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: {},
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
        }
}