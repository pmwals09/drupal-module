import { render, hexToRgb } from "../../tests/test-utils.jsx";
import { chartableQuestions } from "../Chat/questions.js";
import DataViz from "./DataViz.jsx";

test("Shows the correct character", async () => {
  const { findByRole } = render(<DataViz forTest />);
  expect(await findByRole("img", { name: /nadia/i }));
});

test("Shows a question", async () => {
  const { findByRole } = render(<DataViz forTest />);
  expect(
    await findByRole("heading", {
      name: new RegExp(
        chartableQuestions.find(
          (ea) => ea.id === "onboarding.howOld"
        ).shortText,
        "i"
      ),
    })
  );
});
test("Shows a chart", async () => {
  const { findAllByLabelText } = render(<DataViz forTest />);
  expect(await findAllByLabelText(/interactive chart/i));
});

test("Shows question short version if required", async () => {
  const q = chartableQuestions[0];
  const { findByRole, queryByRole } = render(<DataViz forTest />);
  expect(queryByRole("heading", { name: q.text })).toBeNull();
  expect(await findByRole("heading", { name: q.shortText }));
});

test("Shows response short version if required", async () => {
  const q = chartableQuestions[0];
  const { findByText, queryByText } = render(<DataViz forTest />);
  expect(queryByText(q.options[0].text)).toBeNull();
  expect(await findByText(q.options[0].shortText));
});

test.skip("Cycles through different questions/visualizations", () => {});

test("Shows correct color", async () => {
  const q = chartableQuestions[0];
  const { findByTestId } = render(<DataViz forTest />);
  const blob = await findByTestId("blob");
  expect(blob.style.getPropertyValue("background-color")).toMatch(
    hexToRgb(q.topic.color.primary)
  );
});
