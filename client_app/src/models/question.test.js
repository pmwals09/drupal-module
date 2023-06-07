import { Question } from "./question.js";
import { Option } from "./questionOption.js";

describe("Question model", () => {
  test("Calculates fast options", () => {
    const q = new Question({
      text: "What is your birthday",
      options: [
        new Option({ text: "Today" }),
        new Option({ text: "Tomorrow" }),
      ],
    });

    expect(q.fastOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          letter: "A",
          text: "Today",
        }),
        expect.objectContaining({
          letter: "B",
          text: "Tomorrow",
        }),
      ])
    );
  });

  test("Uses regular text if no short text is provided", () => {
    const q = new Question({
      text: "What is your birthday",
      options: [
        new Option({ text: "Today" }),
        new Option({ text: "Tomorrow" }),
      ],
    });

    expect(q.text).toEqual(q.shortText);

    const newQ = new Question({
      text: "What is your birthday",
      shortText: "Bday?",
      options: [
        new Option({ text: "Today" }),
        new Option({ text: "Tomorrow" }),
      ],
    });

    expect(newQ.text).not.toEqual(newQ.shortText);
  });

  test.skip("Validates question response", () => {});
});
