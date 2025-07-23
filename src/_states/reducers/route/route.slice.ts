import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RouteState } from "./route.type";

const initialState: RouteState = {
  current: "",
  name: "",
  isProtected: false,
  Template: null,
  component: null,
  params: null
};


export const route = createSlice({
  name: "route",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<RouteState>) => {
      state = {
        isProtected: false,
        Template: null,
        component: null, ...action.payload
      }
    },
    updateName: (
      state,
      action: PayloadAction<string>
    ) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { navigate, updateName } =
  route.actions;

export default route.reducer;
