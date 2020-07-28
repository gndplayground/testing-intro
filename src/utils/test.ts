import renderer from "react-test-renderer";
import React from "react";

export function rendererToJson(a: React.ReactElement) {
  const component = renderer.create(a);
  const tree = component.toJSON();
  return { component, tree };
}
