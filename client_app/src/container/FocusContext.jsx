import { createContext, useContext, useMemo, useRef } from "react";

const FocusContext = createContext();

export function useFocusContext() {
  const ctx = useContext(FocusContext);
  if (ctx === undefined) {
    throw new Error("useFocusContext must be inside a FocusContext Provider.");
  }
  return ctx;
}

// eslint-disable-next-line react/prop-types
export function FocusContextProvider({ children }) {
  const focusableRegistry = useRef({});

  /*
   * add an element to the registry of available elements to focus
   * @param {Object} args - arguments object for named arguments
   * @param {string} args.key - the key by which to refer to the element
   * @param {HTMLElement} args.element - the element to register
   */
  function setFocusable({ key, element }) {
    if (key in focusableRegistry.current) {
      console.error(
        key,
        "already exists in registry - please pick a unique key"
      );
    }
    focusableRegistry.current[key] = element;
  }

  /*
   * remove an element from the registry
   * @param {Object} args - arguments object
   * @param {string} args.key - the key to remove
   */
  function unsetFocusable(key) {
    if (key in focusableRegistry.current) {
      delete focusableRegistry.current[key];
    }
  }

  /*
   * retrieve an element from the registry
   * @param {string} key - the key of the element to retrieve
   * @returns {HTMLElement}
   */
  function getFocusable(key) {
    if (key in focusableRegistry.current) {
      return focusableRegistry.current[key];
    }
    return null;
  }

  const value = useMemo(
    () => ({
      setFocusable,
      unsetFocusable,
      getFocusable,
    }),
    []
  );

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
}
