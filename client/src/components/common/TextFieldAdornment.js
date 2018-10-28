import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import PropTypes from 'prop-types';

const TextFieldAdornment = ({
  name,
  placeholder,
  value,
  error,
  icon,
  label,
  fullWidth,
  className,
  onChange
}) => {
  let errorText;

  error ? (errorText = error) : (errorText = null);

  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      name={name}
      placeholder={placeholder}
      error={error}
      helperText={errorText}
      value={value}
      className={className}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <i className={icon} />
          </InputAdornment>
        )
      }}
    />
  );
};

TextFieldAdornment.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextFieldAdornment;
