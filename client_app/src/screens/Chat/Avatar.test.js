import { render } from "../../tests/test-utils.jsx";
import Avatar from "./Avatar.jsx";

test("Renders correct image with name prop", () => {
  const { getByRole } = render(<Avatar name="Mateo" />);
  expect(getByRole("img", { name: "Mateo avatar" }).getAttribute("src")).toBe(
    "Mateo.png"
  );
});
