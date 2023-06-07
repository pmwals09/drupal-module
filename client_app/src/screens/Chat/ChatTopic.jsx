import { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useBeforeUnload, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSpeech } from "../../container/SpeechContext.jsx";
import Text from "./Text.jsx";
import { Chat } from "../../models/chat.js";
import { ColorConfig } from "../../models/colorConfig.js";
import { topicsConfig } from "../Topics/Topics.config.js";
import ChatInput from "./ChatInput.jsx";
import { updateProgress } from "../../redux/ducks/progressSlice.js";
import scripts from "./scripts.js";
import { addUnscriptedEntry } from "../../redux/ducks/unscriptedSlice.js";
import rightInput from "../../assets/audio/rightinput.mp3";
import wrongInput from "../../assets/audio/wronginput.mp3";
import receivedSound from "../../assets/audio/message.mp3";
import questions from "./questions.js";
import "./ChatTopic.scss";
import { characterDescriptions } from "../../services/audioDescription.js";
import { useAttractContext } from "../Attract/AttractManager.jsx";
import MoreMessages from "./MoreMessages.jsx";
import {
  shouldScroll,
  interpolateMessages,
  isEndOfThreadResponse,
  getUserMessageConfig,
  buildResponseFormData,
  buildResponseMessageConfig,
} from "./ChatTopic.service.js";
import {
  setHasGoneThroughOnboarding,
  setHasHeardCharacterDescriptions,
} from "../../redux/ducks/settingsSlice.js";
import { getLastItem, clear } from "../../services/announcerService.js";
import { api } from "../../services/apiService.js";
import { useCustomNavigate } from "../../container/useCustomNavigate.js";

const userColor = new ColorConfig({
  primary: "#232232",
  rangeStart: "#E0E0E9",
  rangeEnd: "#EDEDF0",
});

const INTRO_TIMING = 29 * 1000;

function ChatTopic() {
  const { topic } = useParams();
  const [params] = useSearchParams();
  const navigate = useCustomNavigate();
  const progressIdx = useSelector((state) => state.progress[topic]);
  const unscripted = useSelector((state) => state.unscripted[topic]);
  const { isUsingKeypad, hasHeardCharacterDescriptions } = useSelector(
    (state) => state.settings
  );
  const dispatch = useDispatch();
  const topicConfig = topicsConfig.find((config) => config.key === topic);
  const [allMessages, setAllMessages] = useState([]);
  const [openForInput, setOpenForInput] = useState(false);
  const scrollRef = useRef();
  const { triggerHeartbeat } = useAttractContext();
  const { speak, cancel, supported, exportAllText } = useSpeech();
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const hasPerformedInitialLoad = useRef(false);

  const [fadeSpringStyles, fadeSpringApi] = useSpring(
    () => ({
      opacity: 1,
    }),
    [topic]
  );

  const [moveSpringStyles, moveSpringApi] = useSpring(
    () => ({
      x: 0,
    }),
    [topic]
  );

  /*
   * Clear out the live region when we leave - being tidy
   */
  useBeforeUnload(
    useCallback(() => {
      clear();
      cancel();
    }, [cancel, supported])
  );

  /*
   * What if we previously left after an unanswered question? We need to open
   * this up for input if we have a question with no valid responses after it
   */
  useEffect(() => {
    scrollToBottom();
    if (allMessages.length && !hasPerformedInitialLoad.current) {
      const lastQuestion = getLastQuestion();
      const lastQuestionIdx = allMessages.findIndex((m) => m === lastQuestion);
      if (lastQuestionIdx >= 0 && lastQuestionIdx !== allMessages.length - 1) {
        for (let i = lastQuestionIdx + 1; i < allMessages.length; i += 1) {
          const thisMessage = allMessages[i];
          if (
            thisMessage.sender.name === "User" &&
            lastQuestion.validator(thisMessage.rawContent[0].children)[0]
          ) {
            handleOpenForInput(false);
            hasPerformedInitialLoad.current = true;
            return;
          }
        }
        handleOpenForInput(true);
      } else if (lastQuestionIdx === allMessages.length - 1) {
        handleOpenForInput(true);
      }
      hasPerformedInitialLoad.current = true;
    }
    // NOTE: onLoad, allMessages is empty, so we need to add this dependency
  }, [allMessages, allMessages.length]);

  /*
   * Update the messages array based on usage history
   */
  useEffect(() => {
    const msgs = interpolateMessages(
      scripts[topic]({
        isKiosk: params.get("kiosk"),
        target: params.get("target"),
        completeCb: () => dispatch(setHasGoneThroughOnboarding(true)),
      }).map((ea) => Chat.fromScript({ ...ea, isKiosk: params.get("kiosk") })),
      unscripted
    );
    const shouldHearCharDescriptions =
      !progressIdx && isUsingKeypad && !hasHeardCharacterDescriptions;
    if (shouldHearCharDescriptions) {
      speak({
        text: `You're in a group chat with 4 others. ${Object.values(
          characterDescriptions
        )
          .map((ea) => ea.short)
          .join(" ")}`,
      });
      setTimeout(() => {
        setAllMessages(msgs);
      }, INTRO_TIMING);
      dispatch(setHasHeardCharacterDescriptions(true));
    } else {
      setAllMessages(msgs);
    }
  }, [topic, supported]);

  /*
   * Add a way to know when images load in, to have an additional scroll when
   * that happens.
   */
  useEffect(() => {
    document.addEventListener("image-loaded", handleImageLoaded);
    return () =>
      document.removeEventListener("image-loaded", handleImageLoaded);

    function handleImageLoaded() {
      scrollToBottom();
    }
  }, [shouldAutoScroll]);

  /*
   * Handle joining topics
   */
  useEffect(() => {
    if (topic !== "onboarding" && !progressIdx) {
      speak({ text: "You've joined a new group chat topic." });
    }
  }, [topic]);

  /*
   * Callback after a question has finished appearing to the user
   */
  function questionCallback() {
    triggerHeartbeat();
    const personaSound = new Audio(receivedSound);
    personaSound.play();
    // update progress now that the user has seen the item
    dispatch(updateProgress({ [topic]: progressIdx + 1 }));
    const currentMessage = allMessages[progressIdx ?? 0];
    currentMessage.announce(
      ({ message }) => speak({ text: message }),
      progressIdx
    );
    // set the app up to accept input
    handleOpenForInput(true);
    // alert the user that there are additional messages available to view
    if (scrollRef.current) {
      if (!shouldScroll(scrollRef.current)) {
        setShouldAutoScroll(false);
      }
    }
  }

  function scrollToBottom(force = false) {
    if (scrollRef.current && (shouldAutoScroll || force)) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }

  /*
   * Callback after a text has finished appearing to the user
   */
  function viewedCallback() {
    triggerHeartbeat();
    const personaSound = new Audio(receivedSound);
    personaSound.play();
    // update progress now that the user has seen the item
    dispatch(updateProgress({ [topic]: progressIdx }));
    const currentMessage = allMessages[progressIdx ?? 0];
    currentMessage.announce(
      ({ message }) => speak({ text: message }),
      progressIdx
    );
    // get the next item, if any is available
    const nextMessage = allMessages[progressIdx + 1];
    // if there is, add it to the messages
    if (nextMessage) {
      setTimeout(() => {
        // update progress now that the user has seen the item
        dispatch(updateProgress({ [topic]: progressIdx + 1 }));
      }, currentMessage.duration(isUsingKeypad ? 200 : 50));
    }
    // alert the user that there are additional messages available to view
    if (scrollRef.current) {
      if (!shouldScroll(scrollRef.current)) {
        setShouldAutoScroll(false);
      }
    }
  }

  /*
   * User input handler
   * @param {string} text - the text as submitted by the user
   */
  async function handleSubmit(text) {
    const lastQuestion = getLastQuestion();
    const userMessageConfig = getUserMessageConfig({ text, lastQuestion });

    const userChat = Chat.fromScript({
      ...userMessageConfig,
      isKiosk: params.get("kiosk"),
    });

    // assess the input's validity
    const res = lastQuestion?.validator(text);

    // NOTE: Ideally the validator would with the rest of the question,
    // but right now the script is self-referential and would require a greater
    // effort to refactor than we have time (as of 2/27). Saving for later
    const [isValid, nextThread] = res ?? [false, []];
    if (isValid && openForInput) {
      if (isEndOfThreadResponse(nextThread)) {
        // NOTE: And don't forget to include the params to keep them when
        // navigating to the next section!
        fadeSpringApi.start({
          config: {
            duration: 125,
          },
          opacity: 0,
          onResolve: () => {
            setAllMessages([]);
            cancel();

            moveSpringApi.start({
              config: {
                duration: 200,
              },
              x: 1000,
              onResolve: () => {
                navigate(nextThread);
              },
            });
          },
        });
        return;
      }

      const { suppressSubmission, suppressResponse } = lastQuestion;
      if (!suppressSubmission) {
        const formData = buildResponseFormData({ lastQuestion, text });
        api.submitResponse(formData);
      }

      const userSound = new Audio(rightInput);
      userSound.play();

      let responseMessageConfig = null;
      if (!suppressResponse) {
        // if valid and open for input generate a JSON-able object
        // for Redux/localStorage

        // pick the correct/a suitable randomized response
        responseMessageConfig = await buildResponseMessageConfig({
          lastQuestion,
          text,
        });
      }

      // close the app to input
      handleOpenForInput(false);
      // add all unscripted entries to redux/localStorage
      // need to handle for a null response for questions that suppress it
      const scriptEntries = [userMessageConfig];
      if (responseMessageConfig) {
        scriptEntries.push(responseMessageConfig);
      }

      const chatEntries = [userChat];
      if (responseMessageConfig) {
        const responseChat = Chat.fromScript({
          ...responseMessageConfig,
          isKiosk: params.get("kiosk"),
        });
        chatEntries.push(responseChat);
        responseChat.announce(
          ({ message }) => speak({ text: message }),
          progressIdx
        );
      }

      updateChatStates({
        scriptEntries,
        chatEntries,
        nextThread,
      });
    } else {
      const userSound = new Audio(wrongInput);
      userSound.play();
      // if invalid or not open for input generate a JSON-able object for Redux/localStorage
      const responseMessageConfig = {
        type: "text",
        name: lastQuestion
          ? lastQuestion.sender.name
          : scripts[topic]({
              isKiosk: params.get("kiosk"),
              target: params.get("target"),
              completeCb: () => dispatch(setHasGoneThroughOnboarding(true)),
            })[0].name,
        rawContent: [{ tag: "p", attributes: {}, children: "Say what now?" }],
      };

      const responseChat = Chat.fromScript({
        ...responseMessageConfig,
        isKiosk: params.get("kiosk"),
      });
      responseChat.announce(
        ({ message }) => speak({ text: message }),
        progressIdx
      );

      updateChatStates({
        scriptEntries: [userMessageConfig, responseMessageConfig],
        chatEntries: [userChat, responseChat],
      });
    }
  }

  function updateChatStates({ scriptEntries, chatEntries, nextThread = null }) {
    // add all unscripted entries to redux/localStorage
    dispatch(
      addUnscriptedEntry({
        topic,
        index: progressIdx,
        scriptEntries,
      })
    );

    const nextChatEntries = nextThread
      ? nextThread.map((ea) =>
          Chat.fromScript({ ...ea, isKiosk: params.get("kiosk") })
        )
      : [];

    setAllMessages((prev) => [
      ...prev.slice(0, progressIdx),
      ...chatEntries,
      ...nextChatEntries,
      ...prev.slice(progressIdx),
    ]);

    dispatch(updateProgress({ [topic]: progressIdx + chatEntries.length }));
  }

  function handleOpenForInput(isOpen) {
    if (isOpen) {
      const lastEl = getLastItem();
      if (lastEl) {
        lastEl.setAttribute("tabindex", 0);
        lastEl.focus();
      }
      setOpenForInput(true);
    } else {
      setOpenForInput(false);
    }
  }

  /*
   * Find the last available question we've seen and return that item
   */
  function getLastQuestion() {
    for (let i = progressIdx; i >= 0; i -= 1) {
      if (allMessages[i]?.type === "question") {
        return allMessages[i];
      }
    }
    return null;
  }

  /*
   * The core of the app - build an array of messages to display out of the
   * collection of all available messages
   */
  function buildMessagesToShow() {
    if (allMessages.length) {
      if (progressIdx === null) {
        const nextMessage = allMessages[0];
        return [
          <Text
            color={
              nextMessage.sender.name === "User" ? userColor : topicConfig.color
            }
            message={nextMessage}
            cb={() =>
              nextMessage.type === "question"
                ? questionCallback()
                : viewedCallback()
            }
            key={`${nextMessage.toString()}-0`}
            scrollToBottom={() => scrollToBottom()}
            shouldAutoScroll={shouldAutoScroll}
          />,
        ];
      }

      const prevMessagesToShow = allMessages
        .slice(0, progressIdx)
        .map((ea) => (
          <Text
            color={ea.sender.name === "User" ? userColor : topicConfig.color}
            message={ea}
            disableTyping
            key={`${ea.toString()}-${progressIdx}${ea.id ? `-${ea.id}` : ""}`}
            scrollToBottom={() => scrollToBottom()}
            shouldAutoScroll={shouldAutoScroll}
          />
        ));
      const nextMessage = allMessages[progressIdx];
      if (nextMessage) {
        return [
          ...prevMessagesToShow,
          <Text
            color={
              nextMessage.sender.name === "User" ? userColor : topicConfig.color
            }
            message={nextMessage}
            cb={() =>
              nextMessage.type === "question"
                ? questionCallback()
                : viewedCallback()
            }
            disableTyping={nextMessage.sender.name === "User"}
            key={`${nextMessage.toString()}-${progressIdx}${
              nextMessage.id ? `-${nextMessage.id}` : ""
            }`}
            scrollToBottom={() => scrollToBottom()}
            shouldAutoScroll={shouldAutoScroll}
          />,
        ];
      }
      return prevMessagesToShow;
    }
    return [];
  }

  /*
   * Based on the last question, list the keyboard string of the available
   * fast options
   */
  function getFastOptions() {
    const lastQuestion = getLastQuestion();
    if (lastQuestion) {
      const questionObject = questions.find((ea) => ea.id === lastQuestion.id);
      return (
        questionObject?.fastOptions || [
          { letter: "Yes", text: "Move to the next chat" },
          { letter: "No", text: "Return to the topics menu" },
        ]
      );
    }
    return [];
  }

  function handleAutoScroll(e) {
    setShouldAutoScroll(() => shouldScroll(e.target));
  }

  return (
    <animated.div
      style={{ ...fadeSpringStyles, ...moveSpringStyles }}
      className="chat__topic"
    >
      <section
        className="chat__topic__messages"
        ref={scrollRef}
        key={topic}
        onScroll={(e) => handleAutoScroll(e)}
      >
        {buildMessagesToShow()}
        {!shouldAutoScroll ? (
          <MoreMessages handleClick={() => scrollToBottom(true)} />
        ) : null}
      </section>
      {process.env.REACT_APP_EXPORT ? (
        <button
          onClick={() => exportAllText()}
          type="button"
          id="export-button"
        >
          Export Text
        </button>
      ) : null}
      {openForInput ? (
        <ChatInput
          submitCb={(text) => handleSubmit(text)}
          fastOptions={openForInput ? getFastOptions() : []}
          scrollToBottom={() => scrollToBottom()}
        />
      ) : null}
    </animated.div>
  );
}

export default ChatTopic;
