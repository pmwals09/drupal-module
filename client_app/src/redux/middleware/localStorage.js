import { createListenerMiddleware } from "@reduxjs/toolkit";
import { updateProgress } from "../ducks/progressSlice.js";
import {
  setHasHeardCharacterDescriptions,
  setHasGoneThroughOnboarding,
} from "../ducks/settingsSlice.js";
import { resetAppState } from "../ducks/shared.js";
import { addUnscriptedEntry } from "../ducks/unscriptedSlice.js";

export const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  actionCreator: updateProgress,
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      "progress",
      JSON.stringify(listenerApi.getState().progress)
    );
  },
});

localStorageMiddleware.startListening({
  actionCreator: addUnscriptedEntry,
  effect: (_action, listenerApi) => {
    localStorage.setItem(
      "unscripted",
      JSON.stringify(listenerApi.getState().unscripted)
    );
  },
});

localStorageMiddleware.startListening({
  actionCreator: setHasHeardCharacterDescriptions,
  effect: (action) => {
    let newStorage = JSON.parse(localStorage.getItem("settings"));
    if (newStorage) {
      newStorage.hasHeardCharacterDescriptions = action.payload;
    } else {
      newStorage = {
        hasHeardCharacterDescriptions: action.payload,
      };
    }
    localStorage.setItem("settings", JSON.stringify(newStorage));
  },
});

localStorageMiddleware.startListening({
  actionCreator: setHasGoneThroughOnboarding,
  effect: (action) => {
    let newStorage = JSON.parse(localStorage.getItem("settings"));
    if (newStorage) {
      newStorage.hasGoneThroughOnboarding = action.payload;
    } else {
      newStorage = {
        hasGoneThroughOnboarding: action.payload,
      };
    }
    localStorage.setItem("settings", JSON.stringify(newStorage));
  },
});

localStorageMiddleware.startListening({
  actionCreator: resetAppState,
  effect: () => {
    localStorage.removeItem("unscripted");
    localStorage.removeItem("progress");
    localStorage.removeItem("settings");
  },
});
