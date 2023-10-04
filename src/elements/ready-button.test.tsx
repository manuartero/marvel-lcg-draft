import { render } from "@testing-library/react";
import { ReadyButton } from "./ready-button";

describe("<ReadyButton />", () => {
  test("renders", () => {
    const { asFragment } = render(<ReadyButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
