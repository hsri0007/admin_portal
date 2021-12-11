import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {},
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ statusState, setStatusState }) {
  const classes = useStyles();

  const handleChange = (event) => {
    setStatusState(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={statusState}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={0}>Inactive</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
