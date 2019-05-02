import React from 'react';
import { FormHelperText, FormLabel } from '@material-ui/core';
import Select, { components } from 'react-select';
import { KeyboardArrowDownRounded } from '@material-ui/icons';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';

const SelectCreatable = ({
  fullWidth,
  error,
  helperText,
  onChange,
  createLabel,
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
      {value !== null && value.label ? (
        <FormLabel error={error}>{placeholder}</FormLabel>
      ) : null}
      <CreatableSelect
        components={{
          DropdownIndicator,
          Option
        }}
        styles={customStyles}
        fullWidth={fullWidth ? true : false}
        isClearable={isClearable ? true : false}
        className={classnames({
          'mb-3': !helperText
        })}
        formatCreateLabel={inputValue => {
          if (createLabel) {
            return `${createLabel} ${inputValue}`;
          } else {
            return `Criar ${inputValue}`;
          }
        }}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        value={value}
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

SelectCreatable.propTypes = {
  fullWidth: PropTypes.bool,
  createLabel: PropTypes.string,
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

export default SelectCreatable;
