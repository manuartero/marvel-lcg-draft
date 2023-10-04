import { render } from "@testing-library/react";
import { PlayerSelection } from "./player-selection";

describe("<PlayerSelection />", () => {
  test("renders", () => {
    const { asFragment } = render(<PlayerSelection onReady={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test.todo("calls onReady() when ready button is clicked");
});
