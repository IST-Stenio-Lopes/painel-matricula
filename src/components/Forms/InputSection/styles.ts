import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface ContentProps {
  grid_template_column: string;
}
export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  h1 {
    display: inline;
    color: ${theme.colors.primary100};
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
  }

  margin-bottom: 12px;
`;

export const Content = styled.div<ContentProps>`
  display: grid;
  ${(props) => props.grid_template_column && css`
    grid-template-columns: ${props.grid_template_column};
  `}
  column-gap: 18px;
`;
