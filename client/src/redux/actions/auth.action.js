import axios from 'axios';

// Action
import { returnErrors } from './error.action';

// Actions Types
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOGOUT_SUCCESS } from '../action_types';

// APIs
import { URL_LOGIN, URL_LOAD_USER } from '../apis';

// Helper
import { tokenConfig } from './actions.helper';



// Login User
export const login = ({ username, password }) => {
  // Headers
  const config = {
      headers: {
      'Content-Type': 'application/json'
      }
  };

  // Request body
  const body = JSON.stringify({ username, password });

  return async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      try {
          const loginInfo = await axios.post(`${URL_LOGIN}`, body, config);
          dispatch({ type: LOGIN_SUCCESS, payload: loginInfo.data });  
      } catch (error) {
          dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAILURE'));
          dispatch({ type: LOGIN_FAILURE, payload: error });
      }
  }
}

// Logout User
export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
  };
};


// Check token & load user
export const loadUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_USER_REQUEST });
    try {
        const userLoaded = await axios.get(`${URL_LOAD_USER}`, tokenConfig(getState));
        dispatch({ type: LOAD_USER_SUCCESS, payload: userLoaded.data });  
    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'LOAD_USER_FAILURE'));
        dispatch({ type: LOAD_USER_FAILURE, payload: error });
    }
  }
};