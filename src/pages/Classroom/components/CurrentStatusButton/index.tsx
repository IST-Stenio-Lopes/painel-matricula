import React, { SVGProps } from 'react';

import { Container, LeftBar } from './styles';

interface ButtonProps {
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  iconColor: string;
  name: string;
  color?: string;
  handleClick: Function;
  selectedStatus: string;
  handleChangeStatus: (value: string) => void;
}

const CurrentStatusButton: React.FC<ButtonProps> = ({
  icon: Icon, name, iconColor, color, handleClick, selectedStatus, handleChangeStatus,
}) => (
  <Container
    onClick={(e) => { e.stopPropagation(); handleClick(); }}
    color={color}
    isSelected={selectedStatus === name}
  >
    <LeftBar />
    <Icon color={iconColor} height={17} />
    <h2>{name}</h2>
  </Container>
);

export { CurrentStatusButton };
