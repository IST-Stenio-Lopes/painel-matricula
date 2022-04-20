import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerPros>`
  width: 100%;
  flex-direction: column;

  min-height: 205px;
  height: max-content;

  margin-bottom: 16px;

  text-align: left;



  h1 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 8px;

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

  textarea {
    resize: none;
    flex: 1;
    background: transparent;
    padding: 16px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary100};
    border: 2px solid ${theme.colors.secondary10};

    ${(props) => props.isErrored && css`
      border-color: ${theme.colors.red};
    `}

    ${(props) => props.isFocused && css`
      border-color: ${theme.colors.primary50};
    `}

    width: 100%;

    span {
      padding: 0 18px;
    }

    &::placeholder {
      color: ${theme.colors.secondary20};
    }
  }

  svg {
    margin-right: 16px;
  }
`;
