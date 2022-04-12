import React from 'react';

import {
  Container, Header, Frame, Advertising,
} from './styles';

const PreviewContent: React.FC = () => (
  <Container>
    <Header>
      <h2>Pré - Visualização</h2>
    </Header>
    <Frame>
      <Advertising />
    </Frame>
  </Container>
);

export default PreviewContent;
