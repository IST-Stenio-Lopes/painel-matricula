import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  display: grid;
  grid-template-rows: '55px 1fr';

  margin-left: 62px;
  margin-top: 74px;
  padding-bottom: 90px;

  min-height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  height: 55px;


  border-bottom: 1px solid ${theme.colors.secondary10};
`;

export const Content = styled.div`

`;
