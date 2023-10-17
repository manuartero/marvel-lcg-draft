import { render } from "@testing-library/react";
import { HeroSelection, FactionSelection } from "./player-selection";

describe("<HeroSelection />", () => {
  test.skip("renders", () => {
    const { asFragment } = render(<HeroSelection onReady={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test.todo("calls onReady() when ready button is clicked");
});

describe("<FactionSelection />", () => {
  test("renders", () => {
    const { asFragment } = render(<FactionSelection onReady={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test.todo("calls onReady() when ready button is clicked");
});
