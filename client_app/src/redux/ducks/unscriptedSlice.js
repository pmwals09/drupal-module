/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { resetAppState, handleResetAppState } from "./shared.js";

const defaultState = {
  onboarding: [],
  resources: [],
  infrastructure: [],
  culture: [],
  circularEconomy: [],
  influence: [],
};
const initialState = () => {
  const res = localStorage.getItem("unscripted");
  if (res) {
    return {
      ...defaultState,
      ...JSON.parse(res),
    };
  }
  return defaultState;
};

export const unscriptedSlice = createSlice({
  name: "unscripted",
  initialState,
  reducers: {
    addUnscriptedEntry: (state, action) => {
      const { topic, index, scriptEntries } = action.payload;
      state[topic].push({ index, scriptEntries });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppState, (state, action) =>
      handleResetAppState({ defaultState, state, action })
    );
  },
});

export const { addUnscriptedEntry } = unscriptedSlice.actions;

export default unscriptedSlice.reducer;
