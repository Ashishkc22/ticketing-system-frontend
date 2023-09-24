import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty, keys } from "lodash";
function bindMySlice({ name, initialState, reducers, extraReducers }) {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers,
  });
}
function bindAsyncThunks({ thunks }) {
  try {
    if (!isEmpty(thunks.default)) {
      const _thunks = {};
      const extraReducers = {};
      thunks.default.forEach((action) => {
        const { name, thunk, cases = {} } = action;
        _thunks[name] = createAsyncThunk(name, thunk);
        if (_thunks[name].pending && cases.pending) {
          extraReducers[_thunks[name].pending] = cases.pending;
        }
        if (_thunks[name].fulfilled && cases.fulfilled) {
          extraReducers[_thunks[name].fulfilled] = cases.fulfilled;
        }
        if (_thunks[name].rejected && cases.rejected) {
          extraReducers[_thunks[name].rejected] = cases.rejected;
        }
      });
      return { thunks: _thunks, extraReducers };
    }
    return {};
  } catch (error) {
    console.log("error while binding state----Error_state---");
    return {};
  }
}
export { bindMySlice, bindAsyncThunks };
