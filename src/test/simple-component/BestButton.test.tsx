import React from "react";
import renderer from "react-test-renderer";
import BestButton from "./BestButton";

describe("Button", () => {
  it("Should render button", () => {
    const component = renderer.create(<BestButton>Hello</BestButton>);

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render link", () => {
    const component = renderer.create(
      <BestButton href="/URL">Hello</BestButton>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should pass props", () => {
    const component = renderer.create(
      <BestButton aria-busy={true} onClick={() => {}}>
        Hello
      </BestButton>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
