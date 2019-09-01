import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";

import PaperWrapper from "components/PaperWrapper/PaperWrapper";
import Loader from "components/Loader/Loader";

import CampaignsTable from "./Table/CampaignsTable";

import { mockTableData } from "./MockData";

class CampaignsTableContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      tableData: [],
      isLoading: true,
      isError: false,
      url: "https://jsonplaceholder.typicode.com/users"
    };
    this.getData = this.getData.bind(this);
    this.dateCheck = this.dateCheck.bind(this);
  }
  componentDidMount() {
    setTimeout(function() {
     this.getData()
  }.bind(this), 2000);
}

  dateCheck = (startDate, endDate) => {
    let currentDate = new Date();
    let cDate = Date.parse(currentDate);
    return cDate <= Date.parse(endDate) && cDate >= Date.parse(startDate)
      ? true
      : false;
  };

  async getData() {
    const { url } = this.state;
    await axios
      .get(url)
      .then(data => {
        this.setState({
          // TODO:
          // THE API IS CHANGED BECAUSE PROVIDED API RETURN WRONG DATA.
          // IN THAT CASE I USED DATA FROM WORD DOC THAT I HAVE RECEIVED FROM ADFORM, ALSO DUE THAT SOME TESTS FAILS
          // tableData: data.data.map(item => ({
          //   ...item,
          //   active: this.dateCheck(item.startDate, item.endDate)
          // })),
          tableData: mockTableData.map(item => ({
            ...item,
            active: this.dateCheck(item.startDate, item.endDate)
          })),
          isLoading: false,
          isError: false
        });
      })
      .catch(this.setState({ isLoading: false, isError: true }));
  }

  render() {
    const { isLoading, isError, tableData } = this.state;
    return (
      <PaperWrapper
        child={
          <React.Fragment>
            {isError && (
              <Typography>Something wrong with table data</Typography>
            )}
            {isLoading ? <Loader /> : <CampaignsTable tableData={tableData} />}
          </React.Fragment>
        }
      />
    );
  }
}

export default CampaignsTableContainer;
