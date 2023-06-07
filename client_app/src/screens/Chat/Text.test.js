import { Chat } from "../../models/chat.js";
import { render } from "../../tests/test-utils.jsx";
import Text from "./Text.jsx";

// NOTE: Can't access alert role - the chat input section has aria-hidden
// on it for screen reader compatibility, which also hides it from RTL
test.skip("Displays 'typing' animation", () => {
  const name = "Mateo";
  const message = getTestMessage({ name });
  const { getByRole } = render(<Text message={message} />);
  expect(getByRole("alert").getAttribute("aria-busy")).toBe("true");
});
test("Displays additional content after 'typing'", () => {
  const name = "Mateo";
  const content = [<p>Test content</p>];
  const message = getTestMessage({ name, content });
  const { findByText } = render(<Text message={message} />);
  expect(findByText("Test content", {}, { timeout: 1500 }));
});

test("Can skip the 'typing' animation", () => {
  const content = [<p>Test content</p>];
  const message = getTestMessage({ content });
  const { getByText } = render(<Text message={message} disableTyping />);
  expect(getByText("Test content"));
});

// NOTE: using getByAltText because we've hidden the avatar from screen readers
// using aria - this also hides it from RTL
test("Displays the correct avatar", () => {
  const name = "Mateo";
  const message = getTestMessage({ name });
  const { getByAltText } = render(<Text message={message} />);
  expect(getByAltText(new RegExp(name, "i")));
});

test("Displays the correct name", () => {
  const name = "Mateo";
  const message = getTestMessage({ name });
  const { getByAltText } = render(<Text message={message} />);
  expect(getByAltText(new RegExp(name, "i")));
});

function getTestMessage({
  name = "Mateo",
  rawContent = [{ tag: "p", attributes: {}, children: "Test content" }],
}) {
  return Chat.fromScript({
    type: "text",
    name,
    rawContent,
  });
}
