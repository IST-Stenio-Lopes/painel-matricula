import React, { ButtonHTMLAttributes } from 'react';

import { GoTrashcan } from 'react-icons/go';
import Spinner from '../../../Spinner';

import { Container } from './styles';

interface TrashButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hasMargin?: boolean;
  loading?: boolean;
}

const TrashButton: React.FC<TrashButtonProps> = ({
  hasMargin = true,
  loading = false,
  ...rest
}) => (
  <Container hasMargin={hasMargin} {...rest}>
    {loading ? <Spinner /> : <GoTrashcan size={24} />}

  </Container>
);

export default TrashButton;
