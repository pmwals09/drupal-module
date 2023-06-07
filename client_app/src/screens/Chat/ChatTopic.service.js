import { Chat } from "../../models/chat.js";
import { api } from "../../services/apiService.js";
import questions from "./questions.js";

const responses = [
  (percent) => `${percent}% of visitors do too!`,
  (percent) => `Interesting! ${percent}% of visitors thought so too.`,
  (percent) => `${percent}% of visitors picked the same answer.`,
  (percent) => {
    if (percent > 50) {
      return `Most visitors agreed with you at ${percent}%.`;
    }
    return `Only some visitors agreed with you at ${percent}%.`;
  },
  (percent) => `${percent}% of visitors agree with you!`,
  (percent) => `${percent}% of visitors think so too.`,
  (percent) => `${percent}% of visitors answered the same way.`,
  (percent) => `${percent}% agree with you.`,
  (percent) => `${percent}% agreed.`,
  (percent) => `Interesting! ${percent}% of visitors agree with you.`,
];

export function shouldScroll(scrollNode) {
  if (scrollNode) {
    const { scrollHeight, clientHeight, scrollTop } = scrollNode;
    return Math.abs(scrollHeight - clientHeight - scrollTop) < 20;
  }
  return false;
}

/*
 * Interpolate unscripted messages in with the scripted messages
 */
export function interpolateMessages(
  scriptedMessages,
  unscriptedMessages,
  isKiosk
) {
  // first, create the full array of scripted messages. Directly modifying
  // these is impossible because Redux freezes the objects in its state, and
  // undesireable since we would lose state that we may need later
  const allMessages = [...scriptedMessages];
  const allUnscripted = [...unscriptedMessages];

  const res = [];
  let offset = 0;

  for (let i = 0; i < allMessages.length; i += 1) {
    res.push(allMessages[i]);

    if (allMessages[i].validator) {
      // find the next user item that validates this item
      // once it does, tack the new list onto the end of allMessages
      while (allUnscripted.length) {
        const nextBatch = allUnscripted.shift();
        const userInput = nextBatch.scriptEntries.find(
          (msg) => msg.name === "User"
        );
        const [isValid, nextScript] = allMessages[i].validator(
          userInput.rawContent[0].children
        );
        res.push(
          ...nextBatch.scriptEntries.map((ea) =>
            Chat.fromScript({ ...ea, isKiosk })
          )
        );
        if (isValid && typeof nextScript !== "string") {
          // grab the next script and add those to allMessages
          // if nextScript is a string, we're done with this and don't need
          // to capture more here
          allMessages.push(
            ...nextScript.map((ea) => Chat.fromScript({ ...ea, isKiosk }))
          );
          break;
        }
      }
    }

    if (allUnscripted.length && allUnscripted[0].index === i + offset) {
      const nextBatch = allUnscripted.shift();
      res.push(
        ...nextBatch.scriptEntries.map((ea) =>
          Chat.fromScript({ ...ea, isKiosk })
        )
      );
      offset += nextBatch.scriptEntries.length;
    }
  }

  return res;
}

export function isEndOfThreadResponse(nextThread) {
  return typeof nextThread === "string";
}

export function getUserMessageConfig({ text, lastQuestion }) {
  return {
    type: "text",
    name: "User",
    id: `${lastQuestion.id}-${text}`,
    rawContent: text.split("\n").map((ea) => ({
      tag: "p",
      attributes: {},
      children: ea,
    })),
  };
}

export function buildResponseFormData({ text, lastQuestion }) {
  const formData = new FormData();
  formData.append("location", "nmnh");
  formData.append("question", lastQuestion.id);
  formData.append("answer", text.toUpperCase());
  const now = new Date();
  formData.append("day", now.getDate());
  formData.append("month", now.getMonth() + 1);
  formData.append("year", now.getFullYear());
  return formData;
}

async function getPercentAgreement({ lastQuestion, text }) {
  const json = await api.getResponses();
  const relevant = json.filter((j) => j.question === lastQuestion.id);
  const total = relevant.reduce((out, r) => out + r.answer_count, 0);
  const usersResCount =
    relevant.find((r) => r.answer === text)?.answer_count || 0;
  return Math.round((usersResCount / total) * 100);
}

export async function buildResponseMessageConfig({ lastQuestion, text }) {
  const percentAgree = await getPercentAgreement({ lastQuestion, text });
  const qObj = questions.find((q) => q.id === lastQuestion.id);
  const responseTextFn = qObj.responseFormatter
    ? qObj.responseFormatter
    : responses[Math.floor(Math.random() * responses.length)];
  const responseText = responseTextFn(percentAgree);
  return {
    type: "text",
    name: lastQuestion.sender.name,
    id: `${lastQuestion.id}-${responseText}`,
    rawContent: [{ tag: "p", attributes: {}, children: responseText }],
  };
}
