import styled from 'styled-components';
import { theme } from '../../../../../global/styles/styles';

export const Container = styled.div`
  border-bottom: 2px solid ${theme.colors.secondary10};

`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;


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
  flex-direction: row;
  flex-wrap: wrap;

  padding: 8px 32px;
`;
