import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  border: 3px solid ${theme.colors.secondary00};
  border-top: 3px solid ${theme.colors.primary100};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
