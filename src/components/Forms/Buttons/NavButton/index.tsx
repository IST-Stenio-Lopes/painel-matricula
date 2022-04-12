import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import { Container } from './styles';

interface NavButtonProps {
  direction: 'next' | 'back';
  onClick: Function;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, onClick }) => (
  <Container onClick={() => onClick()}>
    {direction === 'next' ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
  </Container>
);

export { NavButton };
