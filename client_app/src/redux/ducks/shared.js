import { createAction } from "@reduxjs/toolkit";

export const resetAppState = createAction("RESET_APP_STATE");

export function handleResetAppState({ defaultState, state, action }) {
  let omit = null;
  const { payload } = action;
  if (payload) {
    omit = payload.omit;
  }
  return Object.keys(defaultState).reduce((out, key) => {
    if (omit && omit.includes(key)) {
      return {
        ...out,
        [key]: state[key],
      };
    }
    return {
      ...out,
      [key]: defaultState[key],
    };
  }, {});
}
