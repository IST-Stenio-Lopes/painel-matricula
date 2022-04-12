import styled from 'styled-components';
import { theme } from '../../../../global/styles/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border: 1px solid ${theme.colors.secondary20};

  padding: 30px 13px;
  min-width: 150px;
  min-height: 150px;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: ${theme.colors.secondary20};
  }
`;
