import React, {
  useEffect, useRef, InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import {
  Container,
} from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  gridRow?: string;
  gridColumn?: string;
}

const CheckboxInput: React.FC<Props> = ({
  name, label, gridRow, gridColumn, ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {
    fieldName, registerField, defaultValue = '',
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => refs.find((ref) => ref.checked)?.value || '',
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find((ref) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container gridRow={gridRow} gridColumn={gridColumn}>
      <input
        name={fieldName}
        type="checkbox"
        {...rest}
      />
      <h2>
        {label}
      </h2>
    </Container>

  );
};

export default CheckboxInput;
