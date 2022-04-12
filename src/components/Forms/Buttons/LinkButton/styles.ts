import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  color?: string;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  border: 0;
  background-color: transparent;
  color: ${theme.colors.primary50};

  svg {
    margin-right: 10px;
  }

  h2 {
    pointer-events: none;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }
  :hover {
    text-decoration: underline;
  }

  ${({ color }) => color && css`
    color: ${color};
  `}
`;
