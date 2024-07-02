import initialState from "./counter.state";
import { bindMySlice, bindAsyncThunks } from "../../utils/store.util";
import reducers from "./counter.action";

const counterSlice = bindMySlice({
  name: "Counter",
  initialState,
  reducers,
});

export const actions = counterSlice.actions;
export const asyncActions = bindAsyncThunks({
  thunks: require("./counter.asyncthunk"),
});
export const reducer = counterSlice.reducer;
