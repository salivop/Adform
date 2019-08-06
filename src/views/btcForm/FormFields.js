import React from "react";
import _map from "lodash/map";

import Moment from "react-moment";

import { FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export const FormFields = ({
  btc,
  handleBtcValue,
  currencyData,
  selectValue,
  selectOptions,
  formatCurrencyValue,
  handleSelectValue,
  handleItemDelete
}) => {
  
  const currencyRatesInfo = _map(currencyData.bpi, currencyValue =>
    !selectOptions.includes(currencyValue.code) ? (
      <TextField
        key={currencyValue.code}
        label={currencyValue.code}
        margin="normal"
        name={currencyValue.code.toLowerCase()}
        value={formatCurrencyValue(btc * currencyValue.rate_float, currencyValue.code)}
        InputProps={{
          endAdornment: (
            <IconButton
              edge="end"
              onClick={() => handleItemDelete(currencyValue.code)}
            >
              <DeleteIcon />
            </IconButton>
          )
        }}
      />
    ) : (
      ""
    )
  );

  const selectCurrency = selectOptions.length !== 0 && (
    <TextField
      name="selectValue"
      value={selectValue}
      onChange={handleSelectValue}
      label="Please select your currency"
      select
      fullWidth
    >
      {_map(selectOptions, (option, key) => (
        <MenuItem key={key} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  return (
    <FormControl>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <TextField
            id="btc"
            label="BTC value"
            name="btc"
            value={btc}
            onChange={handleBtcValue}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography >Currency rates updated on:</Typography>
          <Typography>
            <Moment
              format="YYYY-MM-DD HH:mm:ss"
              date={currencyData.time && currencyData.time.updatedISO}
            />
          </Typography>
          {currencyRatesInfo}
          {selectCurrency}
        </Grid>
      </Grid>
    </FormControl>
  );
};
