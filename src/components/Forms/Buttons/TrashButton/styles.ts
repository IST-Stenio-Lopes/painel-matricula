import { shade } from 'polished';
import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  hasMargin?: boolean;
  hasRipple?: boolean;
}

export const Container = styled.button<ButtonProps>`
  color: ${theme.colors.secondary10};
  width: 44px;
  border: 0;
  border-radius: 50%;
  background-color: transparent;

  transition: color 0.2s;
  transition: background-color 0.2s;


  :hover {
    color:  ${shade(0, theme.colors.primary50)};

    ${({ hasRipple }) => hasRipple && css`
      background-color:  ${shade(0, theme.colors.primary20)};
    `}
  }

  ${({ hasMargin }) => hasMargin && css`
    margin: 5px;
  `}
`;
