import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  grid-column: 1 / 1;
  display: flex;
  flex-direction: column;
  height: 229px;
  background-color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.secondary10};
  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
  border-radius: 4px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  max-height: 168px;
  padding: 24px;
`;

export const TextArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;

  color: ${theme.colors.secondary100};
`;

export const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 2px 0;
  color: ${theme.colors.secondary20};
`;

export const ButtonArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-top: 1px solid ${theme.colors.secondary20};
  max-height: 60px;

  padding: 0 24px;
  gap: 32px;
`;
