import { useField } from '@unform/core';
import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';

import {
  Props as SelectProps,
} from 'react-select';

import {
  Container,
  SelectContainer,
} from './styles';

export interface SelectOptions {
  value: string | number;
  label: string | number;
  color?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

interface SelectLineProps extends SelectProps {
  label: string;
  gridRow?: string;
  gridColumn?: string;
  isSearchable?: boolean;
}

const SelectLine: React.FC<SelectLineProps> = ({
  name, label, options = [], gridRow, gridColumn, isSearchable = false, ...rest
}) => {
  const selectRef = useRef(null);

  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name as string);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: SelectProps) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container
      isErrored={!!error}
      isFilled={false}
      isFocused={isFocused}
      gridRow={gridRow}
      gridColumn={gridColumn}
    >
      <h1>{label}</h1>
      <SelectContainer
        name={name}
        placeholder="Selecione..."
        isSearchable={isSearchable}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue || options[0]}
        ref={selectRef}
        classNamePrefix="react-select"
        options={options}
        {...rest}
      />
      {error && (
        <h2>
          {error}
        </h2>
      )}
    </Container>
  );
};

export default SelectLine;
