import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";

const Loader = () => {
  return (
    <React.Fragment>
      <div align="center">
        <CircularProgress />
      </div>
      <Typography align="center">Please wait...</Typography>
    </React.Fragment>
  );
};

export default Loader;
