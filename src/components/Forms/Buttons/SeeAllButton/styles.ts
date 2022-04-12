import styled from 'styled-components';
import { theme } from '../../../../global/styles/styles';

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 0;
  background-color: transparent;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: ${theme.colors.primary50};

  svg {
    margin-left: 10px;
  }

  :hover {
    text-decoration: underline;
  }
`;
