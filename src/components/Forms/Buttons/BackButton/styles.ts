import styled, { css } from 'styled-components';
import { theme } from '../../../../global/styles/styles';

interface ButtonProps {
  color?: string;
  position?: string;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  flex: 1;
  align-items: center;

  height: 50px;
  max-width: 100px;

  background-color: transparent;
  border: 0;

  color: ${theme.colors.secondary00};

  ${({ color }) => color && css`
    color: ${color};
  `}

  ${({ position }) => position && css`
    position: ${position};

    left: 88px;
    top: 70px;
  `}

  h1 {
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }

  :hover {
    text-decoration: underline;
  }
`;
