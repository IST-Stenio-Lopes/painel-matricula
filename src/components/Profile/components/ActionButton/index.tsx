import React, { SVGProps } from 'react';

import { Container } from './styles';

interface ActionButtonProps {
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  name: string;
  color?: string;
  handleClick: Function;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon, name, color, handleClick,
}) => (
  <Container onClick={() => handleClick()} color={color}>
    <Icon />
    <h2>{name}</h2>
  </Container>
);

export { ActionButton };
