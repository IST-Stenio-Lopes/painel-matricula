import styled, { css } from 'styled-components';
import { WithContext as InputTags } from 'react-tag-input';
import { theme } from '../../../global/styles/styles';

interface ContainerPros {
  disable: boolean;
  gridRow?: string;
  gridColumn?: string;
}

export const Container = styled.div<ContainerPros>`
  display: flex;
  flex: 1;
  min-height: 85px;
  flex-direction: column;

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 36px;
    width: 100%;
    margin-bottom: 15px;

    input {
      background-color: transparent;
      border: 0;
      border-bottom: 2px solid ${theme.colors.secondary10};
      display: flex;
      flex: 1;
      height: 100%;
      width: 100%;

      font-weight: 500;
      font-size: 15px;
      line-height: 18px;

      color: ${theme.colors.secondary100}

    }

    input::placeholder {
      font-style: italic;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;

      color: ${theme.colors.secondary20};
    }

    span {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;

      background: ${theme.colors.primary50};
      box-shadow: 0px 0px 4px rgba(0, 92, 164, 0.3);
      border-radius: 4px;

      color: ${theme.colors.secondary10};
      height: 20px;
      padding: 5px;


      button {
        background: transparent;
        border: none;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 3px;
        color: ${theme.colors.secondary00};

      }
    }

    .ReactTags__selected {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }

    .ReactTags__tagInput {
      height: 34px;
      display: flex;
      flex: 1;
    }

    .ReactTags__tagInputField:focus {
      border-color: ${theme.colors.primary50};
    }

    .ReactTags__tags {
      width: 100%;
    }
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

export const ReactTags = styled(InputTags)`

`;
