import React, { useRef, useEffect } from 'react';

import { useField } from '@unform/core';
import Select from 'react-select/async';

export default function AsyncSelect({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      clearValue(ref) {
        ref.select.select.clearValue();
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      }
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        cacheOptions
        defaultOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}
