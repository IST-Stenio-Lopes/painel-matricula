import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';
import { theme } from '../../../global/styles/styles';

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  gridRow?: string;
  gridColumn?: string;
}

export const SelectContainer = styled(ReactSelect)`
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  min-height: 36px;
  align-content: center;
  border-bottom: 2px solid ${theme.colors.secondary10};
  font-family: ${theme.fonts.titleText};

  h2 {
    text-align: center;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;

    color: ${theme.colors.red};
  }

  .react-select__control {
    background-color: transparent;
    min-height: 36px;

    border: none;
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
  }

  .react-select__indicator-separator {
    visibility:  hidden;
  }

  .react-select__value-container{
    padding: 0;
  }

  .react-select__control--is-focused{
    color: ${theme.colors.secondary60};

  }

  .react-select__menu {
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;

    padding: 16px 0;
  }

  .react-select__placeholder {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary10};
    font-family: ${theme.fonts.titleText};
  }


  .react-select__option{
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 22px ;
  }

  .react-select__multi-value__remove:hover{
    background-color: ${theme.colors.primary20};
    color: ${theme.colors.primary40};
  }

  .react-select__option:hover{
    font-family: ${theme.fonts.titleText};
    background-color: ${theme.colors.secondary05};
    cursor: pointer;
  }

  .react-select__option--is-selected{
    background-color: ${theme.colors.secondary05};
    color: ${theme.colors.secondary60};
    font-family: ${theme.fonts.titleText};
  }
`;

export const Container = styled.div<ContainerPros>`
  display: flex;
  min-height: 85px;
  flex-direction: column;

  width: 100%;

  ${SelectContainer}{
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
`;
