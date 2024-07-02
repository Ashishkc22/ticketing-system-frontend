import initialState from "./common.state";
import { bindMySlice, bindAsyncThunks } from "../../utils/store.util";
import reducers from "./common.action";

const result = bindAsyncThunks({
  thunks: require("./common.asyncthunk"),
});

const counterSlice = bindMySlice({
  name: "common",
  initialState,
  reducers,
  extraReducers: result.extraReducers,
  // extraReducers: (builder) => {
  //   console.log(
  //     'result.thunks["auth/login"].rejected',
  //     result.thunks["auth/login"].rejected
  //   );
  //   builder.addCase(result.thunks["auth/login"].rejected, (state, action) => {
  //     console.log("error=======>", action.error);
  //   });
  // },
});

export const actions = counterSlice.actions;
export const thunks = result.thunks;
export const reducer = counterSlice.reducer;
