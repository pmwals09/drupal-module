/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { resetAppState, handleResetAppState } from "./shared.js";

const defaultState = {
  isUsingKeypad: false,
  hasHeardCharacterDescriptions: false,
  hasGoneThroughOnboarding: false,
};
const initialState = () => {
  const res = localStorage.getItem("settings");
  if (res) {
    return {
      ...defaultState,
      ...JSON.parse(res),
    };
  }
  return defaultState;
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIsUsingKeypad: (state, action) => {
      state.isUsingKeypad = action.payload;
    },
    setHasHeardCharacterDescriptions: (state, action) => {
      state.hasHeardCharacterDescriptions = action.payload;
    },
    setHasGoneThroughOnboarding: (state, action) => {
      state.hasGoneThroughOnboarding = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAppState, (state, action) =>
      handleResetAppState({ defaultState, state, action })
    );
  },
});

export const {
  setIsUsingKeypad,
  setHasHeardCharacterDescriptions,
  setHasGoneThroughOnboarding,
} = settingsSlice.actions;

export default settingsSlice.reducer;
