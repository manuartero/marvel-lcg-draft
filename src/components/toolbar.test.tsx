import { render } from "@testing-library/react";
import { Toolbar } from "./toolbar";

describe("<Toolbar />", () => {
  it("renders", () => {
    const { asFragment } = render(
      <Toolbar onDeckSettings={jest.fn()} onCollection={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
