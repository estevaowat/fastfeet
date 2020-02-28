import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref) {
        ref.setInputValue('');
      },
      clearValue(ref) {
        ref.setInputValue('');
      }
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}

InputMask.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired
};

InputMask.defaultProps = {
  label: ''
};
