import React, { ButtonHTMLAttributes } from 'react';

import { GoTrashcan } from 'react-icons/go';

import { Container } from './styles';

interface TrashButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasMargin?: boolean;
}

const TrashButton: React.FC<TrashButtonProps> = ({ hasMargin = true, ...rest }) => (
  <Container hasMargin={hasMargin} {...rest}>
    <GoTrashcan size={24} />
  </Container>
);

export default TrashButton;
