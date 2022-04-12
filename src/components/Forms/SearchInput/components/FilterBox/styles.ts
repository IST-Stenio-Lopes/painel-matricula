import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 22px;
  max-width: max-content;

  border: 1px solid ${theme.colors.secondary10};
  border-radius: 4px;

  margin: 0 6px;
  padding: 5px 8px;

  color:  ${theme.colors.secondary70};

  h3 {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
  }

  svg {
    color:  ${theme.colors.secondary70};
  }

  button {
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: 8px;

    :hover{
      background-color: ${theme.colors.secondary10};
    }
  }
`;
