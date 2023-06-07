import { render, within } from "../../tests/test-utils.jsx";
import AvatarGroup from "./AvatarGroup.jsx";

test("Shows list of avatars matching props", () => {
  const names = ["Mateo", "Butterbean", "Toni", "Nadia"];
  const { getByRole } = render(<AvatarGroup names={names} />);
  const imgGroup = getByRole("img", {
    name: "Avatars of those in chat: Mateo, Butterbean, Toni, and Nadia",
  });
  names.forEach((name) => {
    expect(
      within(imgGroup)
        .getByRole("img", { name: `${name} avatar` })
        .getAttribute("src")
    ).toBe(`${name}.png`);
  });
});
