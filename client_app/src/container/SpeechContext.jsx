import { createContext, useContext, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useSpeechSynthesis } from "./useSpeechSynthesis.js";
import { announce, clear } from "../services/announcerService.js";

let allText = "";

const SpeechContext = createContext();

export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (ctx === undefined) {
    throw new Error("useSpeech must be used within a SpeechContextProvider");
  }

  return ctx;
}

const defaultSpeakArgs = {
  rate: 1,
  volume: 1,
};

// eslint-disable-next-line react/prop-types
export function SpeechContextProvider({ children }) {
  const {
    speak: ssSpeak,
    cancel: ssCancel,
    supported,
    getUtterances,
  } = useSpeechSynthesis({ onEnd: handleEnd });
  const [params] = useSearchParams();
  const isKiosk = params.get("kiosk");
  const isUsingKeypad = useSelector((state) => state.settings.isUsingKeypad);
  const speakArgs = useRef(defaultSpeakArgs);
  const repeatRef = useRef([]);
  const shouldUpdateSettings = useRef(false);

  function handleEnd() {
    // TODO: Add a callback variable global to the provider that we can set in
    // speak for later use. That way we can hand a cb into speak, set that
    // variable to the handed-in cb, and trigger it here in handleEnd.
    // Unfortunately that would only work on the kiosk, but maybe we still call
    // ssSpeak when using a screen reader, but with volume 0? So it still
    // triggers the cb?
    // eslint-disable-next-line no-console
    console.log("Speech ended");
  }

  /*
   * Manage items that should be spoken aloud, via screen reader or speech
   * synthesis.
   * @param {{}} args - argument object for named arguments
   * @param {string} args.text - text to be spoken aloud
   * @param {boolean} [args.forSr=true] - offer the ability to omit from the screenreader, since certain pages are appropriately accessible
   * @param {boolean} [args.shouldAllowRepeat=true] - offer the ability to repeat with the keypad
   */
  function speak(args) {
    if (process.env.REACT_APP_EXPORT) allText += `${args.text}\n`;
    const { text, forSr = true, shouldAllowRepeat = true, ...rest } = args;
    // the default should be to announce on chatTopic
    // The other pages are more static and can stand alone
    // If we're on the kiosk and using the keypad, we should use ssSpeak

    if (shouldAllowRepeat) {
      repeatRef.current[0] = args;
    }
    if (isKiosk && isUsingKeypad) {
      ssSpeak({
        text,
        ...rest,
        onBoundary: (e) => onBoundary(e, rest.onBoundary),
        ...speakArgs.current,
      });
      // If we're on the kiosk and not using the keypad, no sound at all
      // turn off screen reader on the kiosk?
    } else if (!isKiosk && forSr) {
      announce({ message: text });
    }
  }

  function onBoundary(e, speakOnBoundary) {
    if (shouldUpdateSettings.current) {
      handleUpdateSettings(e);
      shouldUpdateSettings.current = false;
    }
    if (speakOnBoundary) {
      speakOnBoundary(e);
    }
  }

  function cancel() {
    ssCancel();
    clear();
  }

  function updateSettings(updateObj) {
    speakArgs.current = {
      ...speakArgs.current,
      ...updateObj,
    };
    shouldUpdateSettings.current = true;
  }

  function handleUpdateSettings(e) {
    const uQueue = getUtterances();
    if (uQueue.length) {
      // clone the deque
      const newDq = uQueue.clone();

      // cancel speaking - this will clear out the existing deque
      cancel();

      // update the first item
      const currentUtterance = newDq.removeFront().value;
      const currentText = currentUtterance.text;
      const { charIndex } = e;
      const newText = currentText.slice(charIndex);

      // re-speak each item
      speak({ text: newText });
      while (newDq.length) {
        speak({ text: newDq.removeFront().value.text });
      }
    }
  }

  function repeat() {
    if (repeatRef.current && repeatRef.current.length) {
      speak(repeatRef.current[0]);
    }
  }

  function newRepeatContext() {
    repeatRef.current.unshift(null);
  }

  function clearRepeatContext() {
    if (repeatRef.current.length > 1) {
      repeatRef.current.shift();
    } else {
      repeatRef.current[0] = null;
    }
  }

  function exportAllText() {
    if (process.env.REACT_APP_EXPORT) {
      const data = new Blob([allText], { type: "text/plain" });
      const textLink = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = textLink;
      link.download = "text.txt";
      link.click();
      URL.revokeObjectURL(textLink);
    }
    return null;
  }

  const value = useMemo(
    () => ({
      speak,
      cancel,
      supported,
      updateSettings,
      getSettings: () => speakArgs.current,
      repeat,
      newRepeatContext,
      clearRepeatContext,
      exportAllText,
    }),
    [supported, isKiosk, isUsingKeypad]
  );

  return (
    <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
  );
}
