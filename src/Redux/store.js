import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ui } from "./Reducers/ui";
import { auth } from "./Reducers/auth";
import { home } from "./Reducers/home";
import { lots } from "./Reducers/lots";
import { chat } from "./Reducers/chat";

const rootReducer = combineReducers({
  ui,
  auth,
  home,
  lots,
  chat,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;