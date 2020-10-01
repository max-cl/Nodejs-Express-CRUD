import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const middleware = applyMiddleware(thunkMiddleware);
export const store = createStore(rootReducer, middleware);