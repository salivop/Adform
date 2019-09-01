import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import CampaignsTableContainer from "src/views/CampaignsTable/CampaignsTableContainer";

describe("CampaignsTableContainer", () => {
  let wrapper;
  let mock;
  let instance;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    mock.reset();
    wrapper = shallow(<CampaignsTableContainer />);
    instance = wrapper.instance();
  });

  it("should render correctly", async () => {
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, []);
    await instance.getData();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should start with an empty initial values", async () => {
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, []);
    await instance.getData();
    expect(wrapper.state().tableData.length).toBe(0);
    expect(wrapper.state().isLoading).toBeFalsy();
    expect(wrapper.state().isError).toBeFalsy();
    expect(wrapper.state().url).toEqual(
      "https://jsonplaceholder.typicode.com/users"
    );
  });

  it("should have PaperWrapper", () => {
    expect(wrapper.find("PaperWrapper").length).toEqual(1);
  });
});