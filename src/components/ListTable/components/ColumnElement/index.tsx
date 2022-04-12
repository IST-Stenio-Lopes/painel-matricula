import React from 'react';

import { Container } from './styles';

interface ElementProps {
  value: string,
  isBold: boolean,
}

const ColumnElement: React.FC<ElementProps> = ({
  value,
  isBold = false,
}) => (
  <Container isBold={isBold}>
    <h3>{value}</h3>
  </Container>
);

export default ColumnElement;
