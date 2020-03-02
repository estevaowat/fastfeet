import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactInputMask from 'react-input-mask';
import { useField } from '@unform/core';
import { Container } from './styles';

export default function InputMask({ name, label, width, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container width={width}>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </Container>
  );
}

InputMask.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.number
};

InputMask.defaultProps = {
  label: '',
  width: 0
};
