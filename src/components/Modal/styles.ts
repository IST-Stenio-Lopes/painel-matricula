import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  position: fixed;
  top: 0;

  width: 100vw;
  height: 100vh;


  z-index: 2000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(41, 41, 41, 0.25);
`;

export const Content = styled.div`
  width: 550px;
  height: 420px;

  border-radius: 5px;
  border: 1px solid #F0F0F1;
  background-color: ${theme.colors.secondary00};

  padding: 40px;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  height: 85%;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;


  overflow-y: scroll;

  h1 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: ${theme.colors.secondary100};
    text-align: center;

    width: 70%;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  height: 15%;

  grid-gap: 35px;
`;
