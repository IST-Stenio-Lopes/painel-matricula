import { shade } from 'polished';
import styled from 'styled-components';
import { theme } from '../../../../global/styles/styles';

export const Container = styled.button`
  color: ${theme.colors.secondary10};
  width: 44px;
  border: 0;
  border-radius: 50%;
  background-color: transparent;

  transition: color 0.2s;

  :hover {
    svg {
      color:  ${shade(0, theme.colors.primary50)};
    }
  }

`;

export const Content = styled.div`
  padding: 14px 0;

`;
