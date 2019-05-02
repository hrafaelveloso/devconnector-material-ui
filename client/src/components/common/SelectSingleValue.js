import React from 'react';
import { FormHelperText, FormLabel } from '@material-ui/core';
import Select, { components } from 'react-select';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectSingleValue = ({
  fullWidth,
  error,
  helperText,
  onChange,
  placeholder,
  options,
  value,
  isClearable,
  noOptionsMessage
}) => {
  const customStyles = {
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42);',
      '&:hover': {
        boxShadow: 'none'
      }
    }),
    clearIndicator: base => ({
      ...base,
      cursor: 'pointer'
    }),
    dropdownIndicator: base => ({
      ...base,
      cursor: 'pointer'
    })
  };

  const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <KeyboardArrowDownRounded />
        </components.DropdownIndicator>
      )
    );
  };

  const Option = props => {
    return (
      components.Option && (
        <components.Option {...props}>{props.data.label}</components.Option>
      )
    );
  };

  return (
    <>
      {value !== null && value.label ? (
        <FormLabel error={error}>{placeholder}</FormLabel>
      ) : null}
      <Select
        fullWidth={fullWidth ? true : false}
        isClearable={isClearable ? true : false}
        components={{
          DropdownIndicator,
          Option
        }}
        styles={customStyles}
        onChange={onChange}
        className={classnames({
          'mb-3': !helperText
        })}
        placeholder={placeholder}
        value={value}
        options={options}
        noOptionsMessage={() => {
          if (noOptionsMessage) {
            return noOptionsMessage;
          } else {
            return 'No options';
          }
        }}
      />
      {helperText || error ? (
        <FormHelperText error={error ? true : false} className="mb-3">
          {error ? error : helperText}
        </FormHelperText>
      ) : null}
    </>
  );
};

SelectSingleValue.propTypes = {
  fullWidth: PropTypes.bool,
  isClearable: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  noOptionsMessage: PropTypes.string
};

export default SelectSingleValue;
