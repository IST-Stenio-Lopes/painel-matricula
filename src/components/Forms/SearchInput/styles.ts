import styled, { css } from 'styled-components';
import { theme } from '../../../global/styles/styles';

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
}

export const SearchContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div<ContainerPros>`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background-color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.secondary00};

  min-height: 100%;
  width: 100%;

  text-align: left;
  align-items: center;


  & + div {
    margin-top: 8px;
  }

  ${(props) => props.isFocused && css`
    border-color: ${theme.colors.primary50};
  `}

  input {
    display: flex;
    flex: 1;

    border: 0;

    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary100};



    &::placeholder {
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: ${theme.colors.secondary70};
    }
  }

  > svg {
    margin: 0 10px;
    color: ${theme.colors.primary50};
  }

  button {
    width: 24px;
    margin-right: 26px;
    align-items: center;

    color: ${theme.colors.primary50};
    background: transparent;
    border: 0;
  }
`;

export const FiltersContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
