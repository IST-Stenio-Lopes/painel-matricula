import React, {
  InputHTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import { useField } from '@unform/core';

import {
  Container,
} from './styles';
import {
  cellPhone,
  cep,
  cpf,
  currencyMask,
  date,
  metersMask,
  numberMask,
  tel,
  time,
  alphaNumericMask,
  cnpj,
} from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  containerStyle?: object;
  label: string;
  onHandleChange?: Function;
  setValue?: Function;
  icon?: ReactNode;
  disable?: boolean;
  gridRow?: string;
  gridColumn?: string;
  textTransform?: string;
  mask?:'alpha-numeric' | 'cep' | 'tel' | 'cell-phone' | 'cpf'| 'cnpj' | 'date' | 'numeric' | 'time' | 'currency' | 'cpfOrCnpj' | 'meters' | undefined
}

export const InputLine: React.FC<InputProps> = ({
  name,
  disable = false,
  containerStyle = {},
  textTransform,
  icon: Icon, label, mask, gridRow, gridColumn, onHandleChange = () => {}, setValue, ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    switch (mask) {
      case 'cep':
        cep(e);
        break;
      case 'tel':
        tel(e);
        break;
      case 'cell-phone':
        cellPhone(e);
        break;
      case 'cpf':
        cpf(e);
        break;
      case 'date':
        date(e);
        break;
      case 'time':
        time(e);
        break;
      case 'numeric':
        numberMask(e);
        break;
      case 'currency':
        currencyMask(e);
        break;
      case 'cnpj':
        cnpj(e);
        break;
      case 'meters':
        metersMask(e);
        break;
      case 'alpha-numeric':
        alphaNumericMask(e);
        break;
      default:
        break;
    }

    onHandleChange();
    setValue && setValue(e.currentTarget.value);
  }, [mask, onHandleChange, setValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      textTransform={textTransform}
      gridRow={gridRow}
      gridColumn={gridColumn}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      disable={disable}
    >
      {Icon && { Icon } }
      <h1>{label}</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          disabled={disable}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          onChange={handKeyUp}
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
