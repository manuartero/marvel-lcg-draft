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
  test.skip("renders", () => {
    const { asFragment } = render(
      <FactionSelection
        onReady={jest.fn()}
        player1Hero={{
          code: "",
          name: "",
          package: "Core Set",
        }}
        player2Hero={{
          code: "",
          name: "",
          package: "Core Set",
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test.todo("calls onReady() when ready button is clicked");
});
