import React, { ButtonHTMLAttributes } from 'react';

import { GoTrashcan } from 'react-icons/go';
import Spinner from '../../../Spinner';

import { Container } from './styles';

interface TrashButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasMargin?: boolean;
  loading?: boolean;
  hasRipple?: boolean;
}

const TrashButton: React.FC<TrashButtonProps> = ({
  hasMargin = true,
  hasRipple = true,
  loading = false,
  ...rest
}) => (
  <Container hasMargin={hasMargin} hasRipple={hasRipple} {...rest}>
    {loading ? <Spinner /> : <GoTrashcan size={24} />}

  </Container>
);

export default TrashButton;
