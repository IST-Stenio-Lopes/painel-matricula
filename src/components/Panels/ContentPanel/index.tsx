import React, { ReactNode } from 'react';

import {
  Container,
  Header,
  Body,
  Footer,
} from './styles';

interface MessagePanelProps {
  title: string;
  width?: string;
  subTitle?: string;
  gridRow?: string;
  gridColumn?: string;
  footerContent: ReactNode;
}
const ContentPanel: React.FC<MessagePanelProps> = ({
  title,
  subTitle,
  gridRow,
  width = '100%',
  gridColumn,
  footerContent,
  children,
}) => (
  <Container gridRow={gridRow} gridColumn={gridColumn} width={width}>
    <Header>
      <h2>{title}</h2>
      <h3>{subTitle}</h3>
    </Header>
    <Body>
      {children}
    </Body>
    <Footer>
      {footerContent}
    </Footer>
  </Container>
);

export default ContentPanel;
