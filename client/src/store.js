import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  authReducer,
  alertReducer,
  profileReducer,
  postReducer,
} from "./reducers/index";

const store = createStore(
  combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    post: postReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
