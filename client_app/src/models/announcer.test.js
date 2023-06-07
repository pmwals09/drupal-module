import { Announcer } from "./announcer.js";

describe("Announcer class", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterAll(() => {
    document.body.innerHTML = "";
  });

  test("Creates needed divs on init", () => {
    expect(document.querySelectorAll("[aria-live='polite']").length).toBe(0);
    expect(document.querySelectorAll("[aria-live='aggressive']").length).toBe(
      0
    );
    // eslint-disable-next-line no-unused-vars
    const a = new Announcer();
    expect(document.querySelectorAll("[aria-live='polite']").length).toBe(1);
    expect(document.querySelectorAll("[aria-live='assertive']").length).toBe(1);
  });

  describe("Adds message to appropriate div", () => {
    test("polite", () => {
      const a = new Announcer();
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        0
      );
      a.announce({ message: "Hello" });
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        1
      );
    });

    test("assertive", () => {
      const a = new Announcer();
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(0);
      a.announce({ message: "Hello", level: "assertive" });
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(1);
    });
  });

  describe("clears appropriate div", () => {
    test("polite", () => {
      const a = new Announcer();
      a.announce({ message: "Hello" });
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        1
      );
      a.clear("polite");
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        0
      );
    });

    test("assertive", () => {
      const a = new Announcer();
      a.announce({ message: "Hello", level: "assertive" });
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(1);
      a.clear("assertive");
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(0);
    });

    test("both", () => {
      const a = new Announcer();
      a.announce({ message: "Hello", level: "assertive" });
      a.announce({ message: "Hello" });
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(1);
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        1
      );
      a.clear();
      expect(
        document.querySelectorAll("[aria-live='assertive']>div").length
      ).toBe(0);
      expect(document.querySelectorAll("[aria-live='polite']>div").length).toBe(
        0
      );
    });
  });

  test("removes announcer", () => {
    const a = new Announcer();
    expect(document.querySelectorAll("[aria-live='polite']").length).toBe(1);
    expect(document.querySelectorAll("[aria-live='assertive']").length).toBe(1);
    a.remove();
    expect(document.querySelectorAll("[aria-live='polite']").length).toBe(0);
    expect(document.querySelectorAll("[aria-live='assertive']").length).toBe(0);
  });
});
