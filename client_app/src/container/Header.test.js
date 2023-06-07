import { render, hexToRgb } from "../tests/test-utils.jsx";
import Header from "./Header.jsx";
import { settings } from "./Header.config.js";

describe("For Home/Topics screen", () => {
  const headerConfig = settings[0];

  test("Has appropriate navigation on first visit", () => {
    const { queryByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>
    );
    expect(queryByRole("link", { name: /last/i })).toBeNull();
  });

  // BUG: hard to mock - we depend on passing state through the Link component
  // when we go back to the topics screen to detect whether we need this nav or
  // not. Just history isn't going to do it
  test.skip("Has appropriate navigation after seeing a topic", () => {
    const { getByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>,
      {
        context: {
          browserRouter: {
            initialEntries: [
              "/chatbot/chat",
              "/chatbot/chat/onboarding",
              "/chatbot/chat",
            ],
          },
        },
      }
    );
    expect(getByRole("link", { name: /last/i }));
  });

  test("Shows appropriate background color and text", () => {
    const { getByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>
    );
    expect(
      getByRole("banner").style.getPropertyValue("background-color")
    ).toEqual(hexToRgb(headerConfig.color));
  });
});
describe("For Topic/Chat screen", () => {
  const headerConfig = settings.find(
    (ea) => ea.route === "/chatbot/chat/onboarding"
  );

  test("for Topic/chat screen", () => {
    const { getByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>
    );
    expect(
      getByRole("banner").style.getPropertyValue("background-color")
    ).toEqual(hexToRgb(headerConfig.color));
  });

  test("Has appropriate navigation", () => {
    const { getByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>
    );
    expect(getByRole("navigation", { name: "Topics" }));
  });

  test("Has avatar group on topics pages", () => {
    const { getByRole } = render(
      <Header
        color={headerConfig.color}
        nav={headerConfig.nav}
        route={headerConfig.route}
      >
        {headerConfig.text}
      </Header>
    );
    expect(getByRole("img", { name: /avatars of those in chat/i }));
  });
});
