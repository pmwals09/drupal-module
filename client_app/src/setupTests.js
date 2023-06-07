// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./mocks/server.js";

beforeAll(() => {
  global.FormData = () => ({
    append: jest.fn(),
  });
  Object.defineProperty(global.window.HTMLMediaElement.prototype, "play", {
    configurable: true,
    get() {
      setTimeout(() => this.onloadeddata && this.onloadeddata());
      return () => {};
    },
  });
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
