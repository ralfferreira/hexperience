import React, { useRef, useEffect, useCallback } from 'react';

import { useField } from '@unform/core';

import { DetailsInput } from "./styles";

const ExperienceDetailsInput = ({ name, onChangeText, containerStyle = {}, ...rest }) => {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) {
          return inputRef.current.value;
        }

        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    text => {
      if (inputRef.current) {
        inputRef.current.value = text;
      }

      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );
  
  return (
    <DetailsInput
      ref={inputRef}
      onChangeText={handleChangeText}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export default ExperienceDetailsInput;