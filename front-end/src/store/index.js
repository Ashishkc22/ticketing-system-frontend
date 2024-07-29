import { configureStore } from "@reduxjs/toolkit";
import { reducer as commonReducer } from "./common";
import { reducer as projectsReducer } from "./projects";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    projects: projectsReducer,
  },
});
