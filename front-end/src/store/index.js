import { configureStore } from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./counter";
import { reducer as commonReducer } from "./common";
import { reducer as projectsReducer } from "./projects";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    common: commonReducer,
    projects: projectsReducer,
  },
});
