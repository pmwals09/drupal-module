import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render } from "../../tests/test-utils.jsx";
import ChatTopic from "./ChatTopic.jsx";
import AttractManager from "../Attract/AttractManager.jsx";
import { Chat } from "../../models/chat.js";
import scripts from "./scripts.js";

describe("ChatTopic", () => {
  beforeEach(() => {
    Element.prototype.scrollTo = () => {};
  });
  test("Renders the list of chats", async () => {
    const { getByText, findByText } = render(
      <AttractManager handleCloseModal={() => {}}>
        <Routes>
          <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
        </Routes>
      </AttractManager>,
      {
        context: {
          browserRouter: {
            initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
          },
          redux: {
            progress: {
              onboarding:
                scripts.onboarding({ completeCb: () => {} }).length - 1,
            },
          },
        },
      }
    );
    expect(
      getByText("Hey, I'm Toni. Welcome to our group chat!")
    ).toBeInTheDocument();
    expect(
      await findByText(
        "Hi, I'm Mateo.",
        {},
        { timeout: Chat.maxDuration + 100 }
      )
    ).toBeInTheDocument();
  });
  describe("Content jumping", () => {
    test("Jumps to last position if supplied", async () => {
      Element.prototype.scrollTo = () => {};
      const { findByText, getByText, queryByText } = render(
        <AttractManager>
          <Routes>
            <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
          </Routes>
        </AttractManager>,
        {
          context: {
            browserRouter: {
              initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
            },
            redux: {
              progress: {
                onboarding: 1,
              },
            },
          },
        }
      );

      expect(getByText("Hey, I'm Toni. Welcome to our group chat!"));
      expect(
        await findByText(
          "Hi, I'm Mateo.",
          {},
          { timeout: Chat.maxDuration + 100 }
        )
      );
      expect(
        queryByText(
          "Don't forget about me! I’m Nadia and we have tons of questions for you about how you relate to your cell phone."
        )
      ).toBeNull();
    });

    test("Starts at beginning if not supplied", async () => {
      Element.prototype.scrollTo = () => {};
      const { findByText, queryByText } = render(
        <AttractManager>
          <Routes>
            <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
          </Routes>
        </AttractManager>,
        {
          context: {
            browserRouter: {
              initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
            },
            redux: {
              progress: {
                onboarding: null,
              },
            },
          },
        }
      );

      expect(
        await findByText(
          "Hey, I'm Toni. Welcome to our group chat!",
          {},
          { timeout: Chat.maxDuration + 100 }
        )
      );
      expect(queryByText("Hi, I'm Mateo.")).toBeNull();
    });
  });

  // NOTE: Why is it detecting an invalid response, but not a valid one?
  test.skip("Question waits for valid user input", async () => {
    const { findByText, getByRole, queryByRole } = render(
      <AttractManager>
        <Routes>
          <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
        </Routes>
      </AttractManager>,
      {
        context: {
          browserRouter: {
            initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
          },
          redux: {
            progress: {
              onboarding: 15,
            },
          },
        },
      }
    );

    const inputText = "A";

    expect(queryByRole("alert")).toBeNull();

    userEvent.clear(getByRole("textbox", { name: /select an option/i }));
    userEvent.type(
      getByRole("textbox", { name: /select an option/i }),
      inputText
    );
    userEvent.click(getByRole("button", { name: /send text/i }));

    expect(await findByText(inputText, {}, { timeout: 1000 }));

    expect(
      await findByText(
        "Wow, 35% agree!",
        {},
        { timeout: Chat.maxDuration + 100 }
      )
    );
  });

  // NOTE: Why is it detecting an invalid response, but not a valid one?
  test.skip("Providing a valid response after an invalid one produces correct response to valid input", async () => {
    const { findByText, getByRole, queryByRole } = render(
      <AttractManager>
        <Routes>
          <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
        </Routes>
      </AttractManager>,
      {
        context: {
          browserRouter: {
            initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
          },
          redux: {
            progress: {
              onboarding: 15,
            },
          },
        },
      }
    );

    let inputText = "Hello";

    expect(queryByRole("alert")).toBeNull();

    userEvent.clear(getByRole("textbox", { name: /select an option/i }));
    userEvent.type(
      getByRole("textbox", { name: /select an option/i }),
      inputText
    );
    userEvent.click(getByRole("button", { name: /send text/i }));

    expect(await findByText(inputText, {}, { timeout: 1000 }));
    expect(
      await findByText("Say what now?", {}, { timeout: Chat.maxDuration + 100 })
    );

    inputText = "A";

    userEvent.clear(getByRole("textbox", { name: /select an option/i }));
    userEvent.type(
      getByRole("textbox", { name: /select an option/i }),
      inputText
    );
    userEvent.click(getByRole("button", { name: /send text/i }));

    expect(await findByText(inputText, {}, { timeout: 1000 }));
    expect(
      await findByText(
        "Wow, 35% agree!",
        {},
        { timeout: Chat.maxDuration + 100 }
      )
    );
  });

  test.skip("All user input and chatbot responses remain on subsequent visits", () => {});
  test.skip("Navigates to new topic after last question", () => {});

  // NOTE: Why is it detecting an invalid response, but not a valid one?
  test.skip("Keyboard disappears on submit", async () => {
    const { getByRole, queryByRole } = render(
      <AttractManager>
        <Routes>
          <Route path="/chatbot/chat/:topic" element={<ChatTopic />} />
        </Routes>
      </AttractManager>,
      {
        context: {
          browserRouter: {
            initialEntries: ["/chatbot/chat", "/chatbot/chat/onboarding"],
          },
          redux: {
            progress: {
              onboarding: 15,
            },
          },
        },
      }
    );
    userEvent.clear(getByRole("textbox", { name: /select an option/i }));
    expect(getByRole("button", { name: /a/i }));
    userEvent.click(getByRole("button", { name: /a/i }));
    userEvent.click(getByRole("button", { name: /send text/i }));
    expect(queryByRole("button", { name: /a/i })).toBeNull();
  });
});
