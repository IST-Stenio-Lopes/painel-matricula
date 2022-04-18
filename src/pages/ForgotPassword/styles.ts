import styled from 'styled-components';

import signInBackgroundImg from '../../assets/books.png';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  width: 100vw;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.secondary00};
`;

export const Content = styled.div`
  display:flex;
  height: 100vh;
  min-width: 40%;
  max-width: 40%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;


  form {
    width: 70%;
  }
`;

export const LogoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33%;
  width: 70%;

  img {
    width: 100%;
  }
`;

export const Background = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;

  background: url(${signInBackgroundImg}) no-repeat center;

  background-size: cover;
`;

export const TextArea = styled.div`
  width: 100%;
  margin-bottom:50px;

  text-align: left;

  h1 {
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    color: ${theme.colors.secondary100};

    margin-bottom: 8px;
  }

  h2 {
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    color: ${theme.colors.secondary20};
  }
`;

export const ActionContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

export const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
