import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { produce } from "immer";

const KeypressContext = createContext();

export function useGlobalEvent() {
  const ctx = useContext(KeypressContext);
  if (ctx === undefined) {
    throw new Error("useKeypress must be inside a KeypressContext provider.");
  }

  return ctx;
}

// eslint-disable-next-line react/prop-types
export function GlobalEventProvider({ children }) {
  const [handlers, setHandlers] = useState({});

  useEffect(() => {
    Object.keys(handlers).forEach((eventName) => {
      handlers[eventName].forEach((eventHandler) => {
        document.addEventListener(eventName, eventHandler);
      });
    });

    return () => {
      Object.keys(handlers).forEach((eventName) => {
        handlers[eventName].forEach((eventHandler) => {
          document.removeEventListener(eventName, eventHandler);
        });
      });
    };
  }, [Object.keys(handlers).length]);

  function registerHandler({ eventName, eventHandler }) {
    setHandlers((prev) =>
      produce(prev, (draft) => {
        if (
          draft[eventName] &&
          !draft[eventName].some((h) => h === eventHandler)
        ) {
          draft[eventName].push(eventHandler);
        } else {
          // eslint-disable-next-line no-param-reassign
          draft[eventName] = [eventHandler];
        }
      })
    );
  }

  function unregisterHandler({ eventName, eventHandler }) {
    setHandlers((prev) =>
      produce(prev, (draft) => {
        if (
          eventName in draft &&
          draft[eventName].some((ea) => ea === eventHandler)
        ) {
          // eslint-disable-next-line no-param-reassign
          draft[eventName] = draft[eventName].filter(
            (ea) => ea !== eventHandler
          );
        }
      })
    );

    document.removeEventListener(eventName, eventHandler);
  }

  const userEvents = ["keydown", "click", "scroll"];
  const value = useMemo(
    () => ({
      registerHandler,
      unregisterHandler,
      userEvents,
    }),
    []
  );

  return (
    <KeypressContext.Provider value={value}>
      {children}
    </KeypressContext.Provider>
  );
}
