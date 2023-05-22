import { configureStore } from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
