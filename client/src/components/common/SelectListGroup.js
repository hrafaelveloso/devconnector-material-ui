import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  label,
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info ? <small className="form-text text-muted">{info}</small> : null}
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
