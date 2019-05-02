import React from 'react';
import { FormHelperText, FormLabel } from '@material-ui/core';
import Select, { components } from 'react-select';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectMultiValue = ({
  fullWidth,
  error,
  helperText,
  onChange,
  placeholder,
  options,
  value,
  isClearable,
  noOptionsMessage,
  closeMenuOnSelect
}) => {
  const customStyles = {
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      border: 0,
      borderBottom: '1px solid rgba(0, 0, 0, 0.42);',
      height: 'auto',
      background: 'transparent',
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
    }),
    multiValueRemove: base => ({
      ...base,
      cursor: 'pointer',
      color: 'white',
      '&:hover': {
        borderRadius: '10px',
        color: 'white',
        backgroundColor: '#a0e9df'
      }
    }),
    multiValueLabel: base => ({
      ...base,
      color: 'white'
    }),
    multiValue: base => ({
      ...base,
      backgroundColor: '#40d2be',
      borderRadius: '10px'
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
      {value !== null && value.length > 0 ? (
        <FormLabel error={error}>{placeholder}</FormLabel>
      ) : null}
      <Select
        components={{
          DropdownIndicator,
          Option
        }}
        styles={customStyles}
        isMulti
        isClearable={isClearable ? true : false}
        fullWidth={fullWidth ? true : false}
        onChange={onChange}
        className={classnames({
          'mb-3': !helperText
        })}
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect ? true : false}
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

SelectMultiValue.propTypes = {
  fullWidth: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  isClearable: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  noOptionsMessage: PropTypes.string
};

export default SelectMultiValue;
