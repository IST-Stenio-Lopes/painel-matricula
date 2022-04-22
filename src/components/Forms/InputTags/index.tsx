import React, {
  InputHTMLAttributes, ReactNode, useCallback, useEffect, useRef,
} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

import { useField } from '@unform/core';

import {
  Container,
} from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  tags: ITag[];
  setTags: (tags: ITag[]) => void;
  containerStyle?: object;
  label: string;
  icon?: ReactNode;
  disable?: boolean;
  gridRow?: string;
  gridColumn?: string;
}

export interface ITag {
  id: string;
  text: string;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const InputTags: React.FC<InputProps> = ({
  name,
  disable = false,
  tags,
  setTags,
  containerStyle = {},
  icon: Icon, label, gridRow, gridColumn, ...rest
}) => {
  const inputRef = useRef(null);

  const {
    fieldName, error, registerField,
  } = useField(name);

  const handleDelete = useCallback((i) => {
    setTags(tags.filter((_, index) => index !== i));
  }, [setTags, tags]);

  const handleAddition = useCallback((tag) => {
    setTags([...tags, tag]);
  }, [setTags, tags]);

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
      gridRow={gridRow}
      gridColumn={gridColumn}
      disable={disable}
    >
      {Icon && { Icon } }
      <h1>{label}</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ReactTags
          tags={tags}
          placeholder="Pressione enter para adicionar uma nova tag"
          delimiters={delimiters}
          allowDragDrop={false}
          autofocus={false}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          disabled={disable}
          inputFieldPosition="top"
          ref={inputRef}
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
