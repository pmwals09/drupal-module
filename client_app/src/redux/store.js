import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./ducks/progressSlice.js";
import unscriptedReducer from "./ducks/unscriptedSlice.js";
import settingsReducer from "./ducks/settingsSlice.js";
import { localStorageMiddleware } from "./middleware/localStorage.js";

export function getConfiguredStore(preloadedState) {
  return configureStore({
    reducer: {
      progress: progressReducer,
      unscripted: unscriptedReducer,
      settings: settingsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware.middleware),
  });
}
