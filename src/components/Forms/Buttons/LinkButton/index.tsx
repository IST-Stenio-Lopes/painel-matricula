import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  color?: string
}

const LinkButton: React.FC<LinkButtonProps> = ({
  color,
  children,
  icon: Icon,
  ...rest
}) => (
  <Container type="button" color={color} {...rest}>
    {Icon}
    {children}
  </Container>
);

export default LinkButton;
