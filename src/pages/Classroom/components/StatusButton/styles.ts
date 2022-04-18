import { shade } from 'polished';
import styled from 'styled-components';
import { theme } from '../../../../global/styles/styles';

export const Container = styled.button`
  color: ${theme.colors.secondary10};
  width: 44px;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  margin: 5px;

  transition: color 0.2s;
  transition: background-color 0.2s;

  :hover {
    color:  ${shade(0, theme.colors.primary50)};
    background-color:  ${shade(0, theme.colors.primary20)};
    svg {
      color:  ${shade(0, theme.colors.primary50)};
    }
  }

`;
export const Content = styled.div`
`;

export const OptionsContent = styled.div`
  position: absolute;
  width: 215px;

`;
