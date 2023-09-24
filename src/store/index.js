import { configureStore } from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./counter";
import { reducer as commonReducer } from "./common";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    common: commonReducer,
  },
});
