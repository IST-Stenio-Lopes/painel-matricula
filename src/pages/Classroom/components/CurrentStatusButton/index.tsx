import React, { SVGProps } from 'react';

import { Container, LeftBar } from './styles';

interface ButtonProps {
  name: string;
  color?: string;
  handleClick: Function;
  selectedStatus: string;
  handleChangeStatus: (value: string) => void;
}

const CurrentStatusButton: React.FC<ButtonProps> = ({
  name, color, handleClick, selectedStatus, handleChangeStatus,
}) => (
  <Container
    onClick={(e) => { e.stopPropagation(); handleClick(); }}
    color={color}
    isSelected={selectedStatus === name}
  >
    <LeftBar />
    <h2>{name}</h2>
  </Container>
);

export { CurrentStatusButton };
