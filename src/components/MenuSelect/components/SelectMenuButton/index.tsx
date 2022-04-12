import React from 'react';

import { Container } from './styles';

interface SelectMenuButtonProps {
  name: string;
  selectedMenu: string;
  handleSelect: (value : string) => void;
  gridRow?: string;
  gridColumn?: string;
  disabled?: boolean;
}

const SelectMenuButton: React.FC<SelectMenuButtonProps> = ({
  name,
  selectedMenu,
  handleSelect,
  gridRow,
  gridColumn,
  disabled = false,
}) => (
  <Container
    selected={selectedMenu === name}
    onClick={() => !disabled && handleSelect(name)}
    gridRow={gridRow}
    gridColumn={gridColumn}
    disabled={disabled}
  >
    <h2>{name}</h2>
  </Container>
);

export default SelectMenuButton;
