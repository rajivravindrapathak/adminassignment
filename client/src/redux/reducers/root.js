// reducers/root.js page

import { combineReducers } from "redux";
import dashboard from "./dashboard";
import login from "./login"

const rootReducer = combineReducers({
  dashboard,
  login
});

// const appReducer = (state, action) => {
//   if (action.type == CLEAN_STORE) {
//     state = undefined; 
//   }
//   return rootReducer(state, action);
// };

export default rootReducer;
