import userEvent from "@testing-library/user-event";
import { render, waitFor } from "../../tests/test-utils.jsx";
import Topics from "./Topics.jsx";
import { topicsConfig } from "./Topics.config.js";

test("Shows all topic blocks", async () => {
  const { findByRole } = render(<Topics />);
  topicsConfig.forEach(async (topicConfig) => {
    expect(
      await findByRole("link", { name: new RegExp(topicConfig.mainTitle, "i") })
    );
  });
});
test("Attaches appropriate route to each block", async () => {
  const { findByRole } = render(<Topics />);
  const rand = getRandomTopicConfig();
  const link = await findByRole("link", {
    name: new RegExp(rand.subTitle, "i"),
  });
  expect(link.getAttribute("href")).toMatch(new RegExp(rand.key, "i"));
  // expect(
  //   getTopicAroundHeader(rand.mainTitle, findByRole).getAttribute("href")
  // ).toMatch(new RegExp(rand.key), "i");
});
test("Ability to navigate all topics via keyboard", async () => {
  const { getByRole } = render(<Topics />);
  topicsConfig.forEach(async (topicConfig) => {
    userEvent.tab();
    // TODO: .parentElement.parentElement ties DOM structure to a successful
    // test - not sure how else to capture the wrapping topic div around a
    // header, though (PMW 2023-01-25)
    await waitFor(() =>
      expect(
        getTopicAroundHeader(topicConfig.mainTitle, getByRole)
      ).toHaveFocus()
    );
  });
});

test.skip("Displays appropriate icon", () => {});

function getRandomTopicConfig() {
  return topicsConfig[Math.floor(Math.random() * topicsConfig.length)];
}

function getTopicAroundHeader(text, fn) {
  return fn("heading", { name: text }).parentElement.parentElement;
}
