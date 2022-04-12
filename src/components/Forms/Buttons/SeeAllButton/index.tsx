import React from 'react';
import { ReactComponent as DropRightIcon } from '../../../../assets/icons/dropright-icon.svg';

import { Container } from './styles';

interface ButtonProps {
  handleClick: Function;
}

const SeeAllButton: React.FC<ButtonProps> = ({ handleClick, children }) => (
  <Container onClick={() => handleClick()}>
    {children}
    <DropRightIcon />
  </Container>
);

export { SeeAllButton };
