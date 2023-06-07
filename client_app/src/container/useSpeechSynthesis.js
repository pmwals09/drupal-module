import { useEffect, useRef, useState } from "react";
import { Deque } from "./Deque.js";

export function useSpeechSynthesis(args = {}) {
  const { onEnd = () => {} } = args;
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceQueue = useRef(new Deque());

  /* handle supported state to avoid speaking before things are ready */
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsSupported(true);
      getVoices();
    }
  }, []);

  function getVoices() {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  }

  function processVoices(voiceOptions) {
    setVoices(voiceOptions);
  }

  function speak({
    text = "",
    voice = null,
    rate = 1,
    pitch = 1,
    volume = 1,
    onBoundary = () => {},
    onPause = () => {},
    onResume = () => {},
    onStart = () => {},
    onEnd: onUtteranceEnd = () => {},
  }) {
    if (!isSupported) {
      return;
    }

    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.addEventListener("boundary", (e) => onBoundary(e));
    utterance.addEventListener("end", (e) => handleEnd(e, onUtteranceEnd));
    utterance.addEventListener("pause", (e) => onPause(e));
    utterance.addEventListener("resume", (e) => onResume(e));
    utterance.addEventListener("start", (e) => onStart(e));

    utteranceQueue.current.addBack(utterance);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function handleEnd(e, onUtteranceEnd) {
    setIsSpeaking(false);
    utteranceQueue.current.removeFront();
    onUtteranceEnd(e);
    onEnd(e);
  }

  function cancel() {
    if (!isSupported) return;
    utteranceQueue.current.empty();
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  }

  function getUtterances() {
    return utteranceQueue.current;
  }

  return {
    speak,
    cancel,
    supported: isSupported,
    speaking: isSpeaking,
    voices,
    getUtterances,
  };
}
