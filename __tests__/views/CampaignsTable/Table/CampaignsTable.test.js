import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import CampaignsTable from "src/views/CampaignsTable/Table/CampaignsTable";

describe("CampaignsTable", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<CampaignsTable tableData={[]} />)));

  it("should render correctly", () => {
    const component = wrapper;
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should start with an empty initial values", () => {
    expect(wrapper.state().order).toEqual("asc");
    expect(wrapper.state().orderBy).toEqual("id");
  });

  it("should have DOM elements", () => {
    expect(wrapper.find("Fragment").length).toEqual(1);
    expect(wrapper.find("WithStyles(ForwardRef(Table))").length).toEqual(1);
    expect(wrapper.find("WithStyles(ForwardRef(TableHead))").length).toEqual(1);
    expect(wrapper.find("WithStyles(ForwardRef(TableRow))").length).toEqual(1);
    expect(wrapper.find("WithStyles(ForwardRef(TableBody))").length).toEqual(1);
    expect(wrapper.find("WithStyles(ForwardRef(TableCell))").length).toEqual(6);
    expect(
      wrapper.find("WithStyles(ForwardRef(TableSortLabel))").length
    ).toEqual(6);
  });
});