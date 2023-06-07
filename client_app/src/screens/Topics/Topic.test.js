import userEvent from "@testing-library/user-event";
import { render, hexToRgb } from "../../tests/test-utils.jsx";
import Topic from "./Topic.jsx";

test("Is appropriate color", () => {
  const color = hexToRgb("#123456");
  const { getByRole } = render(
    <Topic color={color} topic="onboarding" onFocus={() => {}} />
  );
  const linkStyle = getByRole("link").style;
  expect(linkStyle.getPropertyValue("background-color")).toMatch(color);
});
test("Is navigable by keyboard", () => {
  const color = "#123456";
  const { getByRole } = render(
    <Topic color={color} topic="onboarding" onFocus={() => {}} />
  );
  const link = getByRole("link");
  userEvent.tab();
  expect(link).toHaveFocus();
});
