// src/reducer/RootReducer.js
import { combineReducers } from "redux";
import authReducer from "./auth";
import indexReducer from "./index";

const rootReducer = combineReducers({
  Auth: authReducer,
  Index: indexReducer,
});

export default rootReducer;
