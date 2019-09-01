import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import moment from "moment";

import { tableHeaders } from "./constants";

import { styles } from "./CampaignsTable.styles";

const desc = (a, b, orderBy) => {
  let orderByAType = moment(a[orderBy], "MM/DD/YYYY").isValid()
    ? Date.parse(a[orderBy])
    : a[orderBy];
  let orderByBType = moment(b[orderBy], "MM/DD/YYYY").isValid()
    ? Date.parse(b[orderBy])
    : b[orderBy];
  if (orderByBType < orderByAType) {
    return -1;
  }
  if (orderByBType > orderByAType) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) =>
  order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);

const formatCurrencyValue = (value, currencyCode) =>
  parseFloat(value).toLocaleString(currencyCode, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

class CampaignsTable extends React.Component {
  constructor() {
    super();

    this.state = {
      order: "asc",
      orderBy: "id"
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
  }

  handleRequestSort = (event, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === "desc";
    this.setState(prevState => ({
      order: isDesc ? "asc" : "desc",
      orderBy: property
    }));
  };
  render() {
    const { order, orderBy } = this.state;
    const { tableData } = this.props;

    const tableHeader = (order, orderBy, handleRequestSort) => (
      <TableHead>
        <TableRow>
          {tableHeaders.map(header => (
            <TableCell
              key={header.id}
              padding="default"
              sortDirection={orderBy === header.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === header.id}
                direction={order}
                onClick={event => handleRequestSort(event, header.id)}
              >
                {header.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
    return (
      <React.Fragment>
        <Table>
          {tableHeader(order, orderBy, this.handleRequestSort)}
          <TableBody>
            {stableSort(tableData, getSorting(order, orderBy)).map(
              data =>
                Date.parse(data.endDate) >= Date.parse(data.startDate) && (
                  <TableRow hover key={data.id}>
                    <TableCell padding="none">{`Campaigns ${data.id}`}</TableCell>
                    <TableCell>
                      {data.userId ? data.name : "Unknown User"}
                    </TableCell>
                    <TableCell>{data.startDate}</TableCell>
                    <TableCell>{data.endDate}</TableCell>
                    <TableCell padding="none">
                      <React.Fragment>
                        <span style={styles.colorByDate(data.active)} />
                        {data.active ? "Active" : "Inactive"}
                      </React.Fragment>
                    </TableCell>
                    <TableCell>
                      {formatCurrencyValue(data.Budget, "USD")}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

CampaignsTable.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default CampaignsTable;
