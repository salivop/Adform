import React from "react";
import toJson from 'enzyme-to-json';
import { shallow } from "enzyme";

import PaperWrapper from "src/components/PaperWrapper/PaperWrapper";

describe("PaperWrapper", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<PaperWrapper />)));

  it("should render correctly", () => {
    const component = wrapper;
    expect(toJson(component)).toMatchSnapshot();
  });
});
