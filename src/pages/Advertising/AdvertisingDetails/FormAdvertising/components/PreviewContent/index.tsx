import React from 'react';

import {
  Container, Header, Frame, Advertising,
} from './styles';

interface PreviewProps {
  img: any;
}
const PreviewContent: React.FC<PreviewProps> = ({ img }) => (
  <Container>
    <Header>
      <h2>Pré - Visualização</h2>
    </Header>
    <Frame>
      <Advertising>
        {img
        && <img src={window.URL.createObjectURL(img)} alt="banner" />}
      </Advertising>
    </Frame>
  </Container>
);

export default PreviewContent;
