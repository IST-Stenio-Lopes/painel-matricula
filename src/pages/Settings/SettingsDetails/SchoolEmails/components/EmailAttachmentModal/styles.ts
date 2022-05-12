import { Form } from '@unform/web';
import styled from 'styled-components';
import { theme } from '../../../../../../global/styles/styles';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;


  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(41, 41, 41, 0.25);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 660px;
  height: 729px;

  border-radius: 5px;
  border: 1px solid #F0F0F1;
  background-color: ${theme.colors.secondary00};

  padding: 35px;
`;

export const HorizontalContent = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 44px;


  h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;

    color: ${theme.colors.secondary100};
  }

`;

export const TextHeaderArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 18px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;

  margin-bottom: 24px;
`;

export const IconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 85px;
  min-height: 85px;

  border-radius: 50%;

  background-color: ${theme.colors.secondary75};
  color: ${theme.colors.primary50};
`;

export const Body = styled(Form)`
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
