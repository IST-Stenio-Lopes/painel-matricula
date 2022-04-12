import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  disabled?: boolean;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;
  border: 0;
  border-radius: 50%;

  background-color: transparent;
  transition: background-color 0.2s;

  ${(props) => (!props.disabled
    ? css`
      svg {
        color: ${theme.colors.secondary80};
      }

      :hover{
        cursor: pointer;
        background-color:  ${shade(0, theme.colors.secondary05)};
      }
    `
    : css`
      svg {
        color: ${theme.colors.secondary10};
      }
  `)}
`;
