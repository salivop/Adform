import React, { useState, useEffect } from "react";
import axios from "axios";
import _filter from "lodash/filter";
import _cloneDeep from "lodash/cloneDeep";

import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid";

import PaperWrapper from "../../components/PaperWrapper/PaperWrapper";

import { FormFields } from "./FormFields";

const BtcFormContainer = () => {
  const [currencyData, setCurrencyData] = useState({ data: [] });
  const [btc, setBtc] = useState(0);
  const [selectValue, setSelectValue] = useState({});
  const [selectOptions, setSelectOptions] = useState([]);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const result = await axios(url);
        setCurrencyData(result.data);
      } catch (error) {
        setIsError(true);
      }
    };

    const timer =
      Object.keys(currencyData).length === 1
        ? fetchData()
        : window.setInterval(() => {
            fetchData();
          }, 60000);
    return () => {
      window.clearInterval(timer);
    };
  }, [currencyData, url]);

  const handleBtcValue = event => {
    setBtc(event.target.value);
  };

  const handleSelectValue = event => {
    const selectOptionsTemp = _cloneDeep(selectOptions);
    const filteredSelectValues = _filter(
      selectOptionsTemp,
      value => value !== event.target.value
    );
    setSelectOptions(filteredSelectValues);
  };

  const handleItemDelete = currencyCode => {
    setSelectOptions([...selectOptions, currencyData.bpi[currencyCode].code]);
  };

  const formatCurrencyValue = (value, currencyCode) =>
    parseFloat(value).toLocaleString(currencyCode, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return (
    <PaperWrapper
      form={
        <React.Fragment>
          {isError && <Typography>Something wrong with table data</Typography>}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography align="center">{currencyData.chartName}</Typography>
              <Typography align="center">{currencyData.disclaimer}</Typography>
            </Grid>
            <Grid item>
              <FormFields
                btc={btc}
                handleBtcValue={handleBtcValue}
                currencyData={currencyData}
                selectValue={selectValue}
                selectOptions={selectOptions}
                formatCurrencyValue={formatCurrencyValue}
                handleSelectValue={handleSelectValue}
                handleItemDelete={handleItemDelete}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      }
    />
  );
};

export default BtcFormContainer;
