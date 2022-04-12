import React, { ButtonHTMLAttributes } from 'react';

import { MdClose } from 'react-icons/md';

import { Container } from './styles';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasMargin?: boolean;
}

const CloseButton: React.FC<CloseButtonProps> = ({ hasMargin = true, ...rest }) => (
  <Container hasMargin={hasMargin} {...rest}>
    <MdClose size={32} />
  </Container>
);

export default CloseButton;
