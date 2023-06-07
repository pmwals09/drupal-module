import userEvent from "@testing-library/user-event";
import { render } from "../../tests/test-utils.jsx";
import ChatInput from "./ChatInput.jsx";

const defaultFastOptions = [
  {
    letter: "A",
    text: "First option",
  },
  {
    letter: "B",
    text: "Second option",
  },
];

describe("Keypad behavior", () => {
  test("Keyboard focuses first letter when advancing from input", () => {
    const { getByRole } = render(
      <ChatInput fastOptions={defaultFastOptions} />
    );
    userEvent.tab();
    expect(getByRole("button", { name: /a/i })).toHaveFocus();
  });
});
