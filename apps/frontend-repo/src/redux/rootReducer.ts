import { combineReducers } from "@reduxjs/toolkit";

import { userReducers } from "./user/slices";
import { utilsReducers } from "./utils/slices";

const appReducer = combineReducers({
  user: userReducers,
  utils: utilsReducers,
});

// eslint-disable-next-line
const rootReducer = (state: any, action: any) => {
  if (action.type === "utils/logout") {
    return appReducer(state, action);
  }

  return appReducer(state, action);
};

export { rootReducer };
