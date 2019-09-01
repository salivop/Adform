import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import Loader from "src/components/Loader/Loader";

describe("Loader", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Loader />)));

  it("should render correctly", () => {
    const component = wrapper;
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should have Fragment", () => {
    expect(wrapper.find("Fragment").length).toEqual(1);
  });

  it("should have Typography with styles", () => {
    expect(wrapper.find("WithStyles(ForwardRef(Typography))").length).toEqual(
      1
    );
    expect(
      wrapper.find("WithStyles(ForwardRef(Typography))").get(0).props
    ).toEqual(
      expect.objectContaining({
        align: "center"
      })
    );
  });

  it("should have div with styles", () => {
    expect(wrapper.find("div").length).toEqual(
      1
    );
    expect(
      wrapper.find("div").get(0).props
    ).toEqual(
      expect.objectContaining({
        align: "center"
      })
    );
  });

  it("should Typography have text", () => {
    expect(
      wrapper
        .find("WithStyles(ForwardRef(Typography))")
        .at(0)
        .props().children
    ).toEqual("Please wait...");
  });
});
