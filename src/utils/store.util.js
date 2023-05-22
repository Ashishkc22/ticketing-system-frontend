import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
function bindMySlice({ name, initialState, reducers }) {
  return createSlice({
    name,
    initialState,
    reducers,
  });
}
function bindAsyncThunks({ thunks }) {
  if (!isEmpty(thunks.default)) {
    const _thunks = {};
    thunks.default.forEach((action) => {
      const { name, thunk } = action;
      _thunks[name] = createAsyncThunk(name, thunk);
    });
  }
  return {};
}
export { bindMySlice, bindAsyncThunks };
