import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const NotificationButton = styled.button`
  position: relative;

  background-color: transparent;
  border: 0;
  margin-right: 15px;

  svg {
    width: 28px;
    height: 28px;
    color: ${theme.colors.secondary00};
  }
`;

export const Notification = styled.div`
  background-color: ${theme.colors.red};

  position: absolute;

  top: 0;
  right: 0;

  width: 12px;
  height: 12px;

  border-radius: 50%;
`;

export const TextArea = styled.div`
  margin: 0 16px;
  color: ${theme.colors.secondary00};

  text-align: right;

  h1 {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }

  h2 {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
  }


  :hover {
    text-decoration: underline;
  }
`;

export const ProfileArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;
