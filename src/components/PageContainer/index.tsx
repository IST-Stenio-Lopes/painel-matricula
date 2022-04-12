import React from 'react';

import { Container } from './styles';

interface ContainerProps {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  paddingTop?: string;
}

const PageContainer: React.FC<ContainerProps> = ({
  gridTemplateColumns, gridTemplateRows, paddingTop, children,
}) => (
  <Container
    gridTemplateColumns={gridTemplateColumns}
    gridTemplateRows={gridTemplateRows}
    paddingTop={paddingTop}
  >
    {children}
  </Container>
);

export default PageContainer;
