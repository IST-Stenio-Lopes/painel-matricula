import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  disable: boolean;
  gridRow?: string;
  gridColumn?: string;
}

export const Container = styled.div<ContainerPros>`
  display: flex;
  flex: 1;
  min-height: 85px;
  max-height: 85px;
  flex-direction: column;

  > div {
    height: 36px;
    width: 100%;

    border-bottom: 2px solid ${theme.colors.secondary10};

    ${({ isFocused }) => isFocused && css`
      border-color: ${theme.colors.primary50};
    `}

    ${({ isErrored }) => isErrored && css`
      border-color: ${theme.colors.red};
    `}

  }

  ${({ gridRow }) => gridRow && css`
    grid-row: ${gridRow};
  `}
  ${({ gridColumn }) => gridColumn && css`
    grid-column: ${gridColumn};
  `}

  h1 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary20};
  }

  h2 {
    text-align: center;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;

    color: ${theme.colors.red};

    margin: 8px 0;
  }

  input {
    background-color: transparent;
    display: flex;
    flex: 1;
    width: 100%;
    border: 0;

    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary100}

  }
`;
