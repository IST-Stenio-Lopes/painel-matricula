import styled from 'styled-components';
import { theme } from '../../../../../../global/styles/styles';
import PhoneFrame from '../../../../../../assets/pages/advertising/phone-frame-gray.svg';

export const Container = styled.div`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;

  align-items: center;
  height: 512px;
  background-color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.secondary10};
  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
  border-radius: 4px;
`;

export const Header = styled.div`
  padding: 24px;
  width: 100%;

  h2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    color: ${theme.colors.secondary100};
  }
`;

export const Frame = styled.div`
  height: 100%;
  width: 202px;
  margin-bottom: 59px;
  background: url(${PhoneFrame}) no-repeat center;

  background-size: contain;

  padding: 23px 10px 40px 10px;
`;

export const Advertising = styled.div`
  background: ${theme.colors.secondary00};

  height: 100%;
  width: 100%;

`;
