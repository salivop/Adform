import React from "react";
import toJson from 'enzyme-to-json';
import { shallow } from "enzyme";

import App from "src/App";

describe("CampaignsTableContainer", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<App />)));

  it("should render correctly", () => {
    const component = wrapper;
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should have Fragment", () => {
    expect(wrapper.find('Fragment').length).toEqual(1);
  })

  it("should have CampaignsTableContainer", () => {
    expect(wrapper.find('CampaignsTableContainer').length).toEqual(1);
  })
});
