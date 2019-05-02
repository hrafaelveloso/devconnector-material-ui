import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  FormHelperText,
  MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';

const SelectFormControl = ({
  name,
  placeholder,
  value,
  error,
  label,
  fullWidth,
  className,
  required,
  onChange,
  options
}) => {
  const MenuOptions = options.map((option, index) => (
    <MenuItem key={index} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      className={className}
    >
      <InputLabel>{placeholder}</InputLabel>
      <Select value={value} onChange={onChange} input={<Input name={name} />}>
        {MenuOptions}
      </Select>
      <FormHelperText>{error ? error : label}</FormHelperText>
    </FormControl>
  );
};

SelectFormControl.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectFormControl;
