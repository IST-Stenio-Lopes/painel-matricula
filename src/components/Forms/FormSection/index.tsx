import React from 'react';

import {
  Container,
} from './styles';

interface FormSectionProps {
  gridColumn: string;
  showBackgroundColor?: boolean;
  maxWidth?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  gridColumn, showBackgroundColor, maxWidth, children,
}) => (
  <Container
    gridColumn={gridColumn}
    showBackgroundColor={showBackgroundColor}
    maxWidth={maxWidth}
  >
    {children}
  </Container>
);
