import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface SectionProps {
  gridColumn: string;
  showBackgroundColor?: boolean;
  maxWidth?: string;
}

export const Container = styled.div<SectionProps>`
  display: flex;
  flex-direction: column;
  padding: 16px 29px;

  ${({ gridColumn, showBackgroundColor }) => css`
    grid-column: ${gridColumn};
    background-color:${showBackgroundColor ? theme.colors.secondary05 : 'transparent'} ;
  `}

  ${({ maxWidth }) => css`
    max-width: ${maxWidth};
  `}
`;
