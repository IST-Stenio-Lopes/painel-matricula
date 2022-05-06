/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect, useRef, useState,
} from 'react';

import { useField } from '@unform/core';

import {
  Container,
} from './styles';

interface TextAreaLineProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  rows: number;
  cols?: number;
  containerStyle?: object;
  label: string;
  disable?: boolean;
}

const TextAreaLine: React.FC<TextAreaLineProps> = ({
  name, containerStyle = {}, label, rows, cols, disable, ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // define o hook de do campo de formulario
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  // define os hooks de estados de focus e fill
  const [isFocused, setIsFocused] = useState(false);

  // cria a função de focus usando o hook de callback
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // cria a função de blur do input usando o hook de callback
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // chama o hooks de efeito para registrar o campo do formulario
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
      isErrored={!!error}
      isFilled={false}
      isFocused={isFocused}
    >

      <h1>{label}</h1>

      <textarea
        ref={inputRef}
        disabled={disable}
        onFocus={() => { handleInputFocus(); }}
        onBlur={handleInputBlur}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
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

export default TextAreaLine;
