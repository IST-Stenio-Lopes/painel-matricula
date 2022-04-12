import React from 'react';

import {
  Container,
  Title,
  Content,
} from './styles';

interface InputSectionProps {
  title?: string;
  grid_template_column?: string;
}

const InputSection: React.FC<InputSectionProps> = ({
  title,
  grid_template_column = '1fr 1fr 1fr 1fr',
  children,
}) => (
  <Container>
    {title
  && (
  <Title>
    <h1>
      {title}
    </h1>
  </Title>
  )}
    <Content grid_template_column={grid_template_column}>
      {children}
    </Content>
  </Container>
);

export { InputSection };
