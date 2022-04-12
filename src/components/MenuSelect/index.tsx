import React from 'react';

import { Container, Content } from './styles';

const MenuSelect: React.FC = ({ children }) => (
  <Container>
    <Content>
      {children}
    </Content>
  </Container>
);

export default MenuSelect;
