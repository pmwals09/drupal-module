/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { resetAppState, handleResetAppState } from "./shared.js";

const defaultState = {
  onboarding: null,
  resources: null,
  infrastructure: null,
  culture: null,
  circularEconomy: null,
  influence: null,
};
const initialState = () => {
  const res = localStorage.getItem("progress");
  if (res) {
    return {
      ...defaultState,
      ...JSON.parse(res),
    };
  }
  return defaultState;
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    updateProgress: (state, action) => {
      const entries = Object.entries(action.payload);
      entries.forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppState, (state, action) =>
      handleResetAppState({ defaultState, state, action })
    );
  },
});

export const { updateProgress } = progressSlice.actions;

export default progressSlice.reducer;
