import styled from 'styled-components';
import { theme } from '../../global/styles/styles';

export const Container = styled.div`
  grid-column: 1 / 1;
  display: flex;
  flex-direction: column;
  height: 156px;
  background-color: ${theme.colors.secondary00};
  border: 1px solid ${theme.colors.secondary10};
  box-shadow: 0px 0px 0px 1px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15);
  border-radius: 4px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  padding: 24px 0;
`;
