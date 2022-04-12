import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ItemProps {
  columnGrid: string;
}

export const Container = styled.div<ItemProps>`
  display: grid;
  width: 100%;
  height: 55px;

  padding: 0 24px;
  border-bottom: 1px solid ${theme.colors.secondary10};

  ${(props) => css`
    grid-template-columns: ${props.columnGrid};
  `}

  :hover {
    cursor: pointer;
    background-color: ${theme.colors.secondary05};
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-end;
`;
