import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${theme.colors.secondary10};
  border-radius: 4px;

  margin: 6px 0;
  padding: 7px 15px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50%;


  padding: 8px 0;

  h1 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;

    color: ${theme.colors.secondary20};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;


  padding: 8px 32px;
`;
