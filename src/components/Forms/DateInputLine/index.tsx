import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import pt from 'date-fns/locale/pt-BR';

import DatePicker, { ReactDatePickerProps, registerLocale } from 'react-datepicker';

import { useField } from '@unform/core';

import {
  Container,
} from './styles';

import 'react-datepicker/dist/react-datepicker.css';

interface InputProps extends Omit<ReactDatePickerProps, 'onChange'>{
  name: string;
  label: string;
  placeholder?: string;
  newValue?: any;
  gridRow?: string;
  gridColumn?: string;
  disable?: boolean;
}

registerLocale('pt-BR', pt);

export const DateInputLine: React.FC<InputProps> = ({
  name,
  disable = false,
  label, gridRow, gridColumn, newValue = null, ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // define o hook de do campo de formulario
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const [date, setDate] = useState(defaultValue);

  // define os hooks de estados de focus e fill
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // cria a função de focus usando o hook de callback
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // cria a função de blur do input usando o hook de callback
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleDateChangeRaw = useCallback((e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setDate(newValue);
  }, [newValue]);

  return (
    <Container
      gridRow={gridRow}
      gridColumn={gridColumn}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      disable={disable}
    >
      <h1>{label}</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DatePicker
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          locale="pt-BR"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          dropdownMode="select"
          scrollableYearDropdown
          ref={inputRef as any}
          selected={date as any}
          onChange={setDate}
          onChangeRaw={handleDateChangeRaw}
          {...rest}
        />
      </div>
      {error && (
        <h2>
          {error}
        </h2>
      )}
    </Container>
  );
};
