import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface TitleProps {
  hasSorting: boolean;
}

export const Container = styled.div<TitleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 55px;

  h2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;

    color: ${theme.colors.secondary100}
  }

  ${(props) => props.hasSorting && css`
    :hover {
      cursor: pointer;

      h2 {
        text-decoration: underline;
      }
    }
  `}
`;

export const SortingArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 22px;
  margin: 0 8px;
`;
